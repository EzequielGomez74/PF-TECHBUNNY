const { User } = require("../../services/db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailer = require("../../services/mailer/emailer.js");
const generateValidationAndSendMail = require("../../scripts/generateValidationAndSendMail.js");
require("dotenv").config();

async function handleNewUser(data) {
  if (!data.username || !data.password || !data.email)
    throw new Error("Username , Password , Email are required");
  //Buscar usernames duplicados en DB
  try {
    const duplicate = await User.findOne({
      where: { username: data.username },
    });
    if (duplicate) throw new Error("Username already exist"); //409 = conflict
    //Encryptar el password
    const hashedPwd = await bcrypt.hash(data.password, 10); //10 es la cantidad de SALT
    //Agregar el nuevo usuario en la DB nececita muchos mas datos para que respete el modelo. Atencion aca!
    const newUser = {
      ...data,
      password: hashedPwd,
    };
    // verificationNumber es el numero para validar el email
    let verificationNumber = require ("crypto").randomBytes(10).toString("hex")
    const userdata = {...newUser, type:"register", verificationNumber: verificationNumber}
    console.log("OBJETOOOO",userdata)
    emailer.sendMail(userdata)
    const userCreated = await User.create(newUser);
    generateValidationAndSendMail(userCreated);
    return { success: `New user ${userCreated.username} created` };
  } catch (error) {
    throw new Error(error);
  }
}



async function handleLogin({ username, password, token, guest }) {
  if (guest) {
    const guestUser = await User.findByPk(1);
    return generateTokens(guestUser, true);
  }
  if (!username || !password)
    throw new Error("Username and Password are required");
  try {
    const foundUser = await User.findOne({ where: { username: username } });
    if (!foundUser) throw new Error("Unauthorized user"); //401 = unauthorized
    //evaluar password
    const match = await bcrypt.compare(password, foundUser.dataValues.password);
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
        //$ result === true
        const response = await generateTokens(foundUser);
        response.user = foundUser.dataValues;
        //todo mandar solo los valores correspondientes
        //todo SETEAR SAVED SESSION DATA
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
          return { twoFactor: true };
        }
      }
      const response = await generateTokens(foundUser);
      response.user = foundUser.dataValues;
      //todo mandar solo los valores correspondientes
      //todo SETEAR SAVED SESSION DATA
      return response;
    } else return { status: "bad credentials" };
  } catch (error) {
    throw new Error(error.message);
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
      return { user: foundUser.dataValues, accessToken };
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
}

async function generateTokens(foundUser, infinite) {
  const accessToken = jwt.sign(
    { username: foundUser.username, role: foundUser.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  await foundUser.update({ accessToken });
  return { accessToken };
}

module.exports = { handleLogin, handleNewUser, handleLogout };
