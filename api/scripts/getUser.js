const { User } = require("../services/db/db.js");
async function getUser(condition) {
  const response = await User.findOne({ where: condition });
  return response;
}
module.exports = getUser;
