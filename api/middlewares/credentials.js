const allowedOrigins = require("../config/allowOrigins");

function credentials(req, res, next) {
  const origin = req.headers.origin;
  console.log("ORIGIN = ", origin);
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
}

module.exports = credentials;
