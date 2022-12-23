function requiredAccess(roleToCompare) {
  return function (req, res, next) {
    const role = req.role;
    console.log("To Compare", roleToCompare, "role ", role);
    if (role < roleToCompare) {
      return res.sendStatus(403);
    }
    next();
  };
}

module.exports = requiredAccess;
