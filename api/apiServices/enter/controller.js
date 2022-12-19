const { User } = require("../../services/db/db.js");
const bcrypt = require("bcrypt");

async function handleLogin(user, pwd) {
  if (!user || !pwd)
    throw new Error({
      statusCode: 400,
      msg: "Username and Password are required",
    });
  try {
    const foundUser = await User.findOne({ where: { name: user } });
    if (!foundUser)
      throw new Error({ statusCode: 401, msg: "Unauthorized user" }); //401 = unauthorized
    //evaluar password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      // !! ACA HAY QUE CREAR EL JWT VALIDATOR TOKEN !! json web token (access token - refresh token)
      return { success: `User ${user} is logged in` };
    } else throw new Error({ statusCode: 401, msg: "Wrong Password" });
  } catch (error) {
    throw new Error({ msg: error.message });
  }
}

async function handleNewUser(user, pwd) {
  if (!user || !pwd)
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
    const hashedPwd = await bcrypt.hash(pwd, 10); //10 es la cantidad de SALT
    //Agregar el nuevo usuario en la DB nececita muchos mas datos para que respete el modelo. Atencion aca!
    const newUser = {
      name: user,
      password: hashedPwd,
      surname: "Perez",
      email: "Perez@gmail.com",
      defaultShippingAddress: "Colon 1234",
      zipCode: "2000",
    };
    const userCreated = await User.create(newUser);
    return { success: `New user ${user} created` };
  } catch (error) {
    throw new Error({ statusCode: 500, msg: error.message });
  }
}

module.exports = { handleLogin, handleNewUser };
