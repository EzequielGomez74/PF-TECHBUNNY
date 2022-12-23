
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
    const userById = await SubCategory.findAll({
      where: { user_id },
    });
    return userById;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function editUser(user_id, data){
  try {
    await User.update( data, { where: { user_id }})
    return ("usuario  modificado exitosamente.") //", User.username, "
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = { getAllUsers,getUserById , editUser};
