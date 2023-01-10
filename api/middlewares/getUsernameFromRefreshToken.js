const jwt = require("jsonwebtoken");
function getUsernameFromRefreshToken(req, res, next) {
  const cookies = req.cookies?.jwt;
  console.log("JWT", cookies);
  jwt.verify(cookies, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err) {
      req.username = null;
    } else {
      req.username = decode.username;
    }
  });
  console.log(req.username);
  next();
}
module.exports = getUsernameFromRefreshToken;
