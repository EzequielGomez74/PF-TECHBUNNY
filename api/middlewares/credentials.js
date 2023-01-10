const allowedOrigins = require("../config/allowOrigins");

function credentials(req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    console.log(" --- ENTRA A SETEAR HEADER CREDENTIALS --- ");
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
}

module.exports = credentials;
