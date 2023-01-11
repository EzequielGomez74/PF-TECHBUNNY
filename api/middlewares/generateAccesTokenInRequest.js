const jwt = require("jsonwebtoken");
function generateAccesTokenInRequest(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader) req.accessToken = authHeader.split(" ")[1];
  else req.accessToken = null;
  jwt.verify(
    req.accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (decoded) {
        req.username = decoded.username;
        req.role = decoded.role;
      }
    }
  );
  next();
}
module.exports = generateAccesTokenInRequest;