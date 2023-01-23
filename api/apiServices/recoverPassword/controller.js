const { User } = require("../../services/db/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function recoverPassword({ password, token }) {
  try {
    let parsedCode = token.split("x");
    console.log("parsedCode ", parsedCode);
    const foundUser = await User.findByPk(parsedCode[0]);
    console.log("foundUser ", foundUser);
    const verificationData = foundUser.verificationData.split(" ");
    if (
      isValidToken(verificationData[1]) &&
      parsedCode[1] === verificationData[0]
    ) {
      console.log("entra al if ");
      foundUser.password = bcryptjs.hash(password, 10);
      await foundUser.save();
      console.log("51");
      return "SUCCESS";
    }
    return "FAIL";
  } catch (error) {
    throw new Error(error);
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
module.exports = { recoverPassword };
