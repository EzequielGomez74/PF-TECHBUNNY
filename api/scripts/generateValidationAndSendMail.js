const jwt = require("jsonwebtoken");
const emailer = require("../services/mailer/emailer.js");
function generateValidationAndSendMail(user, type, attemps) {
  const verifyToken = jwt.sign(
    { username: user.username },
    process.env.VERIFY_MAIL_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  const smallCode = require("crypto").randomBytes(10).toString("hex");
  let verificationCode = user.user_id + "x" + smallCode + "x" + attemps;
  user.verificationData = smallCode + " " + verifyToken;
  user.save();
  //SE CREA MAIL DATA
  const object = {
    email: user.email,
    username: user.username,
    verificationCode,
    type,
  };
  emailer.sendMail(object);
}
// function generateValidationAndSendMail(user,type,attemp) {
//   const verifyToken = jwt.sign(
//     { username: user.username },
//     process.env.VERIFY_MAIL_TOKEN_SECRET,
//     { expiresIn: "1h" }
//   );
//   let verificationCode =
//     user.user_id + "x" + require("crypto").randomBytes(10).toString("hex")+"x"+attemp;
//   user.verificationData = verificationCode + " " + verifyToken;
//   user.save();
//   //SE CREA MAIL DATA
//   const object = {
//     email: user.email,
//     username: user.username,
//     verificationCode: verificationCode,
//     type,
//   };
//   emailer.sendMail(object);
// }

module.exports = generateValidationAndSendMail;
