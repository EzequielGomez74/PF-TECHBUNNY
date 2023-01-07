const { User } = require("../../services/db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailer = require("../../services/mailer/emailer.js");
const generateValidationAndSendMail = require("../../scripts/generateValidationAndSendMail.js");
const { OAuth2Client } = require("google-auth-library");

require("dotenv").config();

async function handleNewUser(data) {
  if (!data.username || !data.password || !data.email)
    throw new Error("Username and Password and email are required");
  //Buscar usernames duplicados en DB
  try {
    const duplicate = await User.findOne({
      where: { username: data.username },
    });
    if (duplicate) throw new Error("Username already exist"); //409 = conflict
    //Encryptar el password
    const hashedPwd = await bcrypt.hash(data.password, 10); //10 es la cantidad de SALT
    //Agregar el nuevo usuario en la DB nececita muchos mas datos para que respete el modelo. Atencion aca!
    console.log("pass", hashedPwd);
    const newUser = {
      ...data,
      password: hashedPwd,
    };
    //TODO manejar el caso de que al user se le caduque el token y quiera solicitar uno nuevo
    //GENERARA TOKEN Y GUARDAR EN DB
    //GENERA VERYFICATION CODE
    const userCreated = await User.create(newUser);
    generateValidationAndSendMail(userCreated);
    return { success: `New user ${userCreated.username} created` };
  } catch (error) {
    throw new Error(error);
  }
}
async function handleLogin({ username, password, twoFactorToken }) {
  if (!username || !password)
    throw new Error("Username and Password are required");
  try {
    let foundUser = await User.findOne({ where: { username: username } });
    if (!foundUser) throw new Error("Unauthorized user"); //401 = unauthorized
    //evaluar password
    const match = await bcrypt.compare(password, foundUser.dataValues.password);
    console.log("match ", match);
    console.log("c foundUser ", foundUser.dataValues);
    if (match && foundUser.dataValues.isActive) {
      const result = await verifyTwoFactorToken(
        foundUser.dataValues,
        twoFactorToken
      );
      console.log("c resultverify2FA ", result);
      if (result === false) {
        return null;
      } else if (result.twoFactor) {
        return { twoFactor: true, username, password };
      } else {
        console.log("3");
        //$ result === true
        const response = await generateTokens(foundUser);
        response.user = foundUser.dataValues;
        //todo mandar solo los valores correspondientes
        //todo mandar datos de la sesion tambien
        return response;
      }
    } else throw new Error("LOGIN FAIL");
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
    let foundUser;
    if (email) {
      foundUser = await User.findOne({ where: { email } });
      if (foundUser) {
        if (foundUser.dataValues.isActive) {
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
          //$ user found y a la espera de ser validado por email -> no puede loguearse (el mail esta en uso)
          return { status: "email already in use" };
        }
      } else {
        //$ user not found -> crear nuevo usuario y loguearlo
        const newUser = {
          email: email,
          username: name,
          profilePicture: picture,
        };
        foundUser = await User.create(newUser);
      }
      console.log("foundUser 1", foundUser);
      const response = await generateTokens(foundUser);
      console.log("response ", response);
      response.user = foundUser.dataValues;
      //todo mandar solo los valores correspondientes
      //todo mandar datos de la sesion tambien
      return response;
    } else return { status: "bad credentials" };
  } catch (error) {
    throw new Error(error);
  }
}

async function handleLoginWithRefresh(refreshToken) {
  try {
    let result = false;
    const foundUser = await User.findOne({ where: { refreshToken } });
    if (!foundUser) return { status: "Login Fail" };
    jwt.verify(
      foundUser.refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decode) => {
        if (err || foundUser.username !== decode.username)
          throw new Error("not found");
        result = true;
      }
    );
    if (result) {
      const response = await generateTokens(foundUser);
      response.user = foundUser.dataValues;
      //todo mandar solo los valores correspondientes
      //todo mandar datos de la sesion tambien
      return response;
    } else {
      return { status: "Login Failed" };
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function handleLogout(cookie) {
  const foundUser = await User.findOne({ where: { refreshToken: cookie } });
  if (!foundUser) throw new Error("User not found");
  foundUser.refreshToken = "";
  foundUser.save();
}

async function generateTokens(foundUser) {
  const accessToken = jwt.sign(
    { username: foundUser.username, role: foundUser.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "50m" }
  );
  //guardar el refreshToken en la DB
  await foundUser.update({ refreshToken: refreshToken });
  return { accessToken, refreshToken };
}
async function verifyTwoFactorToken(foundUser, twoFactorToken) {
  try {
    console.log("v1");
    if (foundUser.googleAuth) {
      console.log("v2");
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
  handleLoginWithRefresh,
};
