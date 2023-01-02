const { User } = require("../../services/db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const emailer = require("../../services/mailer/emailer.js");

async function handleNewUser(data) {
  if (!data.username || !data.password)
    throw new Error("Username and Password are required");
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
    //GENERARA TOKEN Y GUARDAR EN DB
    const verifyToken = jwt.sign(
      { username: newUser.username },
      process.env.VERIFY_MAIL_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    //GENERA VERYFICATION CODE
    const userCreated = await User.create(newUser);
    let verificationCode =
      userCreated.user_id +
      "x" +
      require("crypto").randomBytes(10).toString("hex");
    userCreated.verificationData = verificationCode + " " + verifyToken;
    userCreated.save();
    //SE CREA MAIL DATA
    const object = {
      ...newUser,
      verificationCode: verificationCode,
      type: "register",
    };
    emailer.sendMail(newUser.email, object);
    return { success: `New user ${userCreated.username} created` };
  } catch (error) {
    throw new Error(error);
  }
}
async function handleLogin(username, password, token) {
  if (!username || !password)
    throw new Error("Username and Password are required");
  try {
    const foundUser = await User.findOne({ where: { username: username } });
    if (!foundUser) throw new Error("Unauthorized user"); //401 = unauthorized
    //evaluar password
    console.log("LLEGA");
    const match = await bcrypt.compare(password, password);
    if (match) {
      //SI TIENE 2FA
      if (foundUser.googleAuth) {
        if (token) {
          if ("verify") {
          } else return null;
        } else {
          return { twoFactor: true };
        }
      }
      //!! ACA HAY QUE CREAR EL JWT VALIDATOR TOKEN !! json web token (access token - refresh token)
      return generateTokens(foundUser);
    } else throw new Error("Wrong Password");
  } catch (error) {
    throw new Error(error.message);
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
    { expiresIn: "600s" }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1200s" }
  );
  //guardar el refreshToken en la DB
  foundUser.set({ refreshToken: refreshToken });
  await foundUser.save();
  return { accessToken, refreshToken };
}

module.exports = { handleLogin, handleNewUser, handleLogout };
