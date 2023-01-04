const jwt = require("jsonwebtoken");
const emailer = require("../services/mailer/emailer.js");
function generateValidationAndSendMail(user) {
  const verifyToken = jwt.sign(
    { username: user.username },
    process.env.VERIFY_MAIL_TOKEN_SECRET,
    { expiresIn: "72h" }
  );
  let verificationCode =
    user.user_id + "x" + require("crypto").randomBytes(10).toString("hex");
  user.verificationData = verificationCode + " " + verifyToken;
  user.save();
  //SE CREA MAIL DATA
  const object = {
    ...user,
    verificationCode: verificationCode,
    type: "register",
  };
  emailer.sendMail(user.email, object);
}

module.exports = generateValidationAndSendMail;
