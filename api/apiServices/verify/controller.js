const { User } = require("../../services/db/db.js");
const { use } = require("./routes.js");
const jwt = require("jsonwebtoken");
const generateValidationAndSendMail = require("../../scripts/generateValidationAndSendMail.js");
require("dotenv").config();

async function validateUser(code) {
  try {
    const extractedId = code.split("x"); //15x451f6cddc008ea9c4871
    const user = await User.findByPk(extractedId[0]);
    const verificationData = user.verificationData.split(" ");
    if (isValidToken(verificationData[1]) && code === verificationData[0]) {
      //activar
      user.isActive = true;
      user.verificationData = "";
      user.save();
      return "SUCCESS";
    }
    return "FAIL";
  } catch (error) {
    throw new Error(error.message);
  }
}
async function refreshValidation(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user.isActive) generateValidationAndSendMail(user);
    return "email sent";
  } catch (error) {
    throw new Error(error.message);
  }
}
function isValidToken(token) {
  let valid = false;
  jwt.verify(token, process.env.VERIFY_MAIL_TOKEN_SECRET, (err, decoded) => {
    if (err) return;
    valid = true;
  });
  return valid;
}
module.exports = { validateUser, refreshValidation };
