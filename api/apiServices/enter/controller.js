const { User } = require("../../services/db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleNewUser(username, password) {
  if (!username || !password)
    throw new Error({
      statusCode: 400,
      msg: "Username and Password are required",
    });
  //Buscar usernames duplicados en DB
  try {
    const duplicate = await User.findOne({ where: { username: username } });
    if (duplicate)
      throw new Error({ statusCode: 400, msg: "Username already exist" }); //409 = conflict
    //Encryptar el password
    console.log("2");
    const hashedPwd = await bcrypt.hash(password, 10); //10 es la cantidad de SALT
    //Agregar el nuevo usuario en la DB nececita muchos mas datos para que respete el modelo. Atencion aca!
    const newUser = {
      username: username,
      name: "jose",
      surname: "perez",
      password: hashedPwd,
      email: "a",
      billingAddress: "a",
      defaultShippingAddress: "a",
      zipCode: "a",
      profilePicture: "a",
    };
    const userCreated = await User.create(newUser);
    return { success: `New user ${user} created` };
  } catch (error) {
    throw new Error(error);
  }
}
async function handleLogin(username, password) {
  if (!username || !password)
    throw new Error({
      statusCode: 400,
      msg: "Username and Password are required",
    });
  try {
    const foundUser = await User.findOne({ where: { username: username } });
    if (!foundUser)
      throw new Error({ statusCode: 401, msg: "Unauthorized user" }); //401 = unauthorized
    //evaluar password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      //!! ACA HAY QUE CREAR EL JWT VALIDATOR TOKEN !! json web token (access token - refresh token)
      const accessToken = jwt.sign(
        { username: foundUser.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "60s" }
      );
      //guardar el refreshToken en la DB
      foundUser.set({ refreshToken: refreshToken });
      await foundUser.save();
      return { accessToken, refreshToken };
    } else throw new Error({ statusCode: 400, msg: "Wrong Password" });
  } catch (error) {
    throw new Error({ statusCode: 500, msg: error.message });
  }
}

async function handleLogout(cookie) {
  const foundUser = await User.findOne({ where: { refreshToken: cookie } });
  if (!foundUser) throw new Error({ statusCode: 401, msg: "User not found" });
  foundUser.refreshToken = "";
  foundUser.save();
}

module.exports = { handleLogin, handleNewUser, handleLogout };
