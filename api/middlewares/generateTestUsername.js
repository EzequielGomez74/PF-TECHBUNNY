function generateTestUsername(req, res, next) {
  if (!req.username) req.username = "Emilocura";
  console.log(req.headers);
  next();
}
module.exports = generateTestUsername;
