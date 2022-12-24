
const { User } = require("../../services/db/db.js");

async function getAllUsers() {
  try {
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

async function modifyUser(user_id, body){ //  los admins usan este controller
  try {
    await User.update( body, { where: { user_id }})
    return ("usuario  modificado exitosamente.") 
  } catch (error) {
    throw new Error(error.message);
  }
}



module.exports = { getAllUsers,getUserById , modifyUser};
