const { check } = require("express-validator");
const { validateResult } = require("../../scripts/validateHelper.js");

const user = [
  //check("user_id").not().exists(),
  //check("name").not().exists(),
  //check("role").not().exists(),
  //check("refreshToken").not().exists().custom({error: "no podes modificar refresh"}),
  //check('username').exists().not().isEmpty(),
  check("name").isString(),

  //check("email").isEmail(),
  //check("password").isString().isLength({ min: 6 }),
  // check("profilePicture").isURL(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
const product = [];
module.exports = user;

// user_id: {
// username: {
// name: {
// surname: {
// password: {
// email:
// billingAddress: {
// defaultShippingAddress:
// zipCode:
// role:
// isActive:
// needPasswordReset:
// profilePicture:
