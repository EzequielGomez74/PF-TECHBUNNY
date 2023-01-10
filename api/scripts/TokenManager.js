const jwt = require("jsonwebtoken");
require("dotenv").config();

// class JWTManager {
//   #getTokenName(tokenName) {
//     switch (tokenName) {
//       case "accessToken":
//         return process.env.ACCESS_TOKEN_SECRET;
//       case "refreshToken":
//         return process.env.REFRESH_TOKEN_SECRET;
//       case "verifyToken":
//         return process.env.VERIFY_MAIL_TOKEN_SECRET;
//     }
//   }

//   static signToken(tokenName, payload, options) {
//     //const secret = this.#getTokenName(tokenName);
//     const result = jwt.sign(payload, secret, options);
//     return result;
//   }
//   static verifyToken(tokenName, token, secret) {
//     let result;
//     //const secret = this.#getTokenName(tokenName);
//     jwt.verify(token, secret, (err, decode) => {
//       if (err) {
//         result = null;
//         return;
//       }
//       result = decode;
//     });
//     return result;
//   }
// }
// module.exports = JWTManager;

/*
jwt.verify(
      foundUser.refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err || foundUser.username !== decode.username)
          throw new Error("not found");
        accessToken = jwt.sign(
          { username: foundUser.username, role: foundUser.role },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "5m",
          }
        );
      }
    );
*/

/*
const accessToken = jwt.sign(
    { username: foundUser.username, role: foundUser.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
  */
