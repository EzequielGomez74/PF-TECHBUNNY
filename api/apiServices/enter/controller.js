const { User } = require("../../services/db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleNewUser(user, password) {
  if (!user || !password)
    throw new Error({
      statusCode: 400,
      msg: "Username and Password are required",
    });
  //Buscar usernames duplicados en DB
  try {
    const duplicate = await User.findOne({ where: { name: user } });
    if (duplicate)
      throw new Error({ statusCode: 409, msg: "Username already exist" }); //409 = conflict
    //Encryptar el password
    const hashedPwd = await bcrypt.hash(password, 10); //10 es la cantidad de SALT
    //Agregar el nuevo usuario en la DB nececita muchos mas datos para que respete el modelo. Atencion aca!
    const newUser = {
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
    console.log(error.message);
    throw new Error({ statusCode: 500, msg: error.message });
  }
}
async function handleLogin(user, password) {
  if (!user || !password)
    throw new Error({
      statusCode: 400,
      msg: "Username and Password are required",
    });
  try {
    console.log("comienza");
    const foundUser = await User.findOne({ where: { name: user } });
    console.log(foundUser);
    if (!foundUser)
      throw new Error({ statusCode: 401, msg: "Unauthorized user" }); //401 = unauthorized
    //evaluar password
    console.log("usuario encontrado");
    const match = await bcrypt.compare(password, foundUser.password);
    console.log("matchea el password");
    if (match) {
      //!! ACA HAY QUE CREAR EL JWT VALIDATOR TOKEN !! json web token (access token - refresh token)
      const accessToken = jwt.sign(
        { username: foundUser.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15s" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "40s" }
      );
      //guardar el refreshToken en la DB
      foundUser.set({ refreshToken: refreshToken });
      await foundUser.save();
      return { accessToken, refreshToken };
    } else throw new Error({ statusCode: 401, msg: "Wrong Password" });
  } catch (error) {
    throw new Error({ msg: error.message });
  }
}

async function handleLogout(cookie) {
  const foundUser = await User.findOne({ where: { refreshToken: cookie } });
  if (!foundUser) throw new Error({ statusCode: 400, msg: "cualquierucha" });
  foundUser.refreshToken = "";
  foundUser.save();
}

module.exports = { handleLogin, handleNewUser, handleLogout };
