const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(req.headers);
  if (!authHeader) return res.json({ m: "ard" }); //unauthorized
  const token = authHeader.split(" ")[1]; //bearer 112983*ÄS}d123+´}sa-
  console.log("token ", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.json({ m: "ard" });
    //forbidden invalid token
    req.username = decoded.username;
    req.role = decoded.role;
    next();
  });
}

module.exports = verifyJWT;
