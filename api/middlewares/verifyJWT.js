const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(402); //!!unauthorized
  const token = authHeader.split(" ")[1]; //Bearer 112983*ÄS}d123+´}sa-
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(401); // !!LOGOUT
    //forbidden invalid token
    req.username = decoded.username;
    req.role = decoded.role;
    next();
  });
}

module.exports = verifyJWT;
