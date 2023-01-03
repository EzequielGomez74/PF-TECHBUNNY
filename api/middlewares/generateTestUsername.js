function generateTestUsername(req, res, next) {
  if (!req.username) req.username = "Emilocura";
  next();
}
module.exports = generateTestUsername;
