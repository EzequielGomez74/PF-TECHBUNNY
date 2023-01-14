function generateAccesTokenInRequest(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader) req.accessToken = authHeader.split(" ")[1];
  else req.accessToken = null;
  next();
}
module.exports = generateAccesTokenInRequest;
