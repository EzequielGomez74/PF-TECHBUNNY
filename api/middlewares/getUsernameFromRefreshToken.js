const jwt = require("jsonwebtoken");
function getUsernameFromRefreshToken(req, res, next) {
  const cookies = req.cookies?.jwt;
  jwt.verify(cookies, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err) {
      req.username = null;
    } else {
      req.username = decode.username;
    }
  });
  next();
}
module.exports = getUsernameFromRefreshToken;
