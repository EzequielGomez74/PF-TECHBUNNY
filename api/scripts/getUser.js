const { User } = require("../../services/db/db.js");
async function getUser(condition) {
  return await User.findOne({ where: condition });
}
module.exports = getUser;
