const { check } = require("express-validator")
const { validateResult } = require("../../scripts/validateHelper.js")

const validateCreate = [
    //check("user_id").not().exists(),
    // check("role").not().exists(),
    // check("refreshToken").not().exists().custom(error: "no podes modificar refresh"),
    
    // check('username').exists().not().isEmpty(),
    check("name").isString(),
    //check("email").isEmail(),
    // check("password").isString().isLength({ min: 6 }),
    // check("profilePicture").isURL(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }


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