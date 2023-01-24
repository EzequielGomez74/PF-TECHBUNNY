const { User, Op } = require("../../services/db/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailer = require("../../services/mailer/emailer.js");
const generateValidationAndSendMail = require("../../scripts/generateValidationAndSendMail.js");
const { OAuth2Client } = require("google-auth-library");
const TokenManager = require("../../scripts/TokenManager");
const userController = require("../user/controller");
require("dotenv").config();

async function handleNewUser(data) {
  if (!data.username || !data.password || !data.email)
    throw new Error("Username and Password and email are required");
  //Buscar usernames duplicados en DB
  try {
    const duplicate = await User.findOne({
      where: {
        [Op.or]: [{ username: data.username }, { email: data.email }],
      },
    });

    if (duplicate) return "USERNAME OR EMAIL ALREADY EXIST"; //409 = conflict
    //Encryptar el password
    const hashedPwd = await bcrypt.hash(data.password, 10); //10 es la cantidad de SALT
    //Agregar el nuevo usuario en la DB nececita muchos mas datos para que respete el modelo. Atencion aca!
    const newUser = {
      ...data,
      password: hashedPwd,
    };
    //TODO manejar el caso de que al user se le caduque el token y quiera solicitar uno nuevo
    //GENERARA TOKEN Y GUARDAR EN DB
    //GENERA VERYFICATION CODE
    const userCreated = await User.create(newUser);
    generateValidationAndSendMail(userCreated, "register", 2);
    return "SUCCESS";
  } catch (error) {
    throw new Error(error);
  }
}
async function handleLogin({ username, password, twoFactorToken }) {
  if (!username || !password)
    throw new Error("Username and Password are required");
  try {
    let foundUser = await User.findOne({ where: { username: username } });
    if (!foundUser) return "USUARIO INEXISTENTE"; //401 = unauthorized
    if (foundUser.isDeleted === true) return "CUENTA DESHABILITADA";
    const match = await bcrypt.compare(password, foundUser.dataValues.password);
    if (match && foundUser.dataValues.isActive) {
      const result = await verifyTwoFactorToken(
        foundUser.dataValues,
        twoFactorToken
      );
      if (result === false) {
        return null;
      } else if (result.twoFactor) {
        return { twoFactor: true, username, password };
      } else {
        //$ result === true
        const response = await generateTokens(foundUser);
        response.user = userController.setLoggedUserData(foundUser.dataValues); //foundUser.dataValues;
        //todo mandar solo los valores correspondientes
        //todo SETEAR SAVED SESSION DATA
        return response;
      }
    } else if (!match) {
      return "CONTRASEÑA INCORRECTA";
    } else return "MAIL NO VALIDADO";
  } catch (error) {
    throw new Error(error.message);
  }
}
async function handleGoogleLogin({ tokenId, twoFactorToken }) {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_LOGIN_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    let foundUser = "pepe";
    if (email) {
      foundUser = await User.findOne({
        where: { email },
      });
      if (foundUser && !foundUser.isDeleted) {
        if (foundUser.dataValues.isActive) {
          //     //$ si usa google login ahi si lo logueo
          if (foundUser.dataValues.usingGoogleLogin) {
            //$ usuario encontrado y activo -> loguear usuario
            const result = verifyTwoFactorToken(
              foundUser.dataValues,
              twoFactorToken
            );
            if (result === true) {
              foundUser.update({ profilePicture: picture, username: name });
            } else if (result === false) {
              return null;
            } else if (result.twoFactor) {
              return { twoFactor: true, tokenId: tokenId };
            }
          } else {
            //$ usuario activo pero no es de google
            return "EMAIL ALREADY IN USE";
          }
        } else {
          //$ user found y a la espera de ser validado por email -> no puede loguearse (el mail esta en uso)
          return "EMAIL ALREADY IN USE";
        }
      } else {
        //$ user not found -> crear nuevo usuario y loguearlo
        if (!foundUser) {
          const newUser = {
            email: email,
            username: name,
            profilePicture: picture,
            usingGoogleLogin: true,
            isActive: true,
          };
          foundUser = await User.create(newUser);
        } else {
          return "CUENTA DESHABILITADA";
        }
      }
      const response = await generateTokens(foundUser);
      response.user = userController.setLoggedUserData(foundUser.dataValues); //foundUser.dataValues;
      //todo mandar solo los valores correspondientes
      //todo SETEAR SAVED SESSION DATA
      return response;
    } else {
      return "NO SE VALIDO EL TOKEN";
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function handleLoginWithAccess(accessToken) {
  try {
    let result = false;
    const foundUser = await User.findOne({ where: { accessToken } });
    if (!foundUser) return { status: "Login Fail" };
    jwt.verify(
      foundUser.accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decode) => {
        if (err || foundUser.username !== decode.username)
          throw new Error("not found");
        result = true;
      }
    );
    if (result) {
      //todo mandar solo los valores correspondientes
      //todo SETEAR SAVED SESSION DATA
      return {
        user: userController.setLoggedUserData(foundUser.dataValues),
        accessToken: foundUser.dataValues.accessToken,
      };
    } else {
      return { status: "Login Failed" };
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function handleLogout(user_id) {
  const foundUser = await User.findOne({ where: { user_id } });
  if (!foundUser) return "FAIL";
  foundUser.accessToken = "";
  //todo GUARDAR SAVED SESSION DATA
  foundUser.save();
  return "SUCCESS";
}

async function handleRecoverPassword(email) {
  try {
    const users = await User.findAll({ where: { email } });
    let foundUser = null;
    users.forEach((user) => {
      if (!user.dataValues.usingGoogleLogin) foundUser = user;
    });
    if (!foundUser) return "FAIL";
    generateValidationAndSendMail(foundUser, "recover", 1);
    return "SUCCESS";
  } catch (error) {
    throw new Error(error);
  }
}

async function generateTokens(foundUser) {
  const accessToken = jwt.sign(
    { username: foundUser.username, role: foundUser.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "120m" }
  );
  await foundUser.update({ accessToken });
  return { accessToken };
}
async function verifyTwoFactorToken(foundUser, twoFactorToken) {
  try {
    if (foundUser.googleAuth) {
      if (twoFactorToken) {
        //todo verificar twoFactorToken
        if ("si no se verifica") return false;
      } else {
        return { twoFactor: true };
      }
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  handleLogin,
  handleNewUser,
  handleLogout,
  handleGoogleLogin,
  handleLoginWithAccess,
  handleRecoverPassword,
};
