const allowedOrigins = require("../config/allowOrigins");

function credentials(req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = credentials;
