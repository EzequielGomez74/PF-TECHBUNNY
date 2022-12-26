const { check } = require("express-validator");
const { validateResult } = require("../validateHelper.js");

const user = [
  //estos no se deben de modificar
  check("user_id").not().isEmpty().withMessage("no podes pasar un user id"),
  check("role").not().exists().withMessage("no podes un role"),
  check("refreshToken").not().exists().withMessage("no podes modificar el refresh token"),
  check('isActive').isEmpty().withMessage("no podes modificar isActive"),
  check('needPasswordReset').isEmpty().withMessage("no podes modificar needPasswordReset"),
  check('isLogged').isEmpty().withMessage("no podes modificar isLogged"),
  
  
  //estos si se pueden modificar
  check('username').exists().isString().withMessage("el username debe ser un string"),
  check("name").exists().isString(),
  check("password").isString().isLength({ min: 6 }).withMessage("la password debe tener al menos 6 caracteres"),
  check("email").isEmail(),
  check("profilePicture").isURL().withMessage("La foto de perfil debe ser una url"),
  check("defaultShippingAddress").exists().withMessage("no podes modificar isLogged"),
  check("surname").isString().withMessage("el surname debe ser un string"),
  check("billingAddress").isString().withMessage("el billingAddress debe ser un string"),
  check("zipCode").isNumeric().withMessage("el zipCode debe un numero"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];
const product = [  //check("user_id").not().exists(),
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
},];


const order = [
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
]


module.exports = { user, product, order };

// user_id: 
// username: 
// name: 
// surname: 
// password: 
// email:
// billingAddress: 
// defaultShippingAddress:
// zipCode:
// role:
// isActive:
// needPasswordReset:
// profilePicture:
