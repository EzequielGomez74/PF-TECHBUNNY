const bcrypt = require("bcrypt");
const { User } = require("../../services/db/db.js");

async function getAllUsers() {
  try {
    console.log("a");
    const allUsers = await User.findAll();
    return allUsers;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getUserById(user_id) {
  try {
    const userById = await User.findAll({
      where: { user_id },
    });
    return userById;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteUser(user_id) {
  try {
    const deleteUserId = await User.destroy({
      where: { user_id },
    });
    if (deleteUserId) {
      return "Usuario eliminado con exito!";
    } else {
      return "Usuario no encontrado!";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function modifyUser(user_id, body) {
  //  los admins usan este controller
  try {
    body.password = await bcrypt.hash(body.password, 10); // 10 salt

    await User.update(body, { where: { user_id } });
    return "usuario  modificado exitosamente.";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getAllUsers, getUserById, modifyUser, deleteUser };
