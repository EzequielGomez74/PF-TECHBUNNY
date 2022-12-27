const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers["Authorization"];
  console.log("HEADER ", authHeader);
  if (!authHeader) return res.json({ m: "ard" }); //unauthorized
  const token = authHeader.split(" ")[1]; //Bearer 112983*ÄS}d123+´}sa-
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.json({ m: "ard" });
    //forbidden invalid token
    req.username = decoded.username;
    req.role = decoded.role;
    console.log("Pass ", decoded.username);
    next();
  });
}

module.exports = verifyJWT;
