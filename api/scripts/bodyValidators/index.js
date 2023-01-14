const { check } = require("express-validator");
const { User } = require("../../services/db/db.js");
const { validateResult } = require("../validateHelper.js");

const user = [
  //estos no se deben de modificar
  check("user_id").isEmpty().withMessage("no podes pasar un user id"),
  check("role").not().exists().withMessage("no podes modificar un role"),
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
const product = [ 
  check("product_id").isNumeric().withMessage("product id debe ser numerico"),

  check("name").exists().isString(),
  check("description").exists().isString(),
  check("image").isURL().withMessage("la imagen debe ser una URL"),
  check("price").isNumeric().withMessage("el price debe un numero"),
  check("stock").exists().isNumeric().withMessage(" stock debe ser numerico"),
  check("soldCount").exists().isNumeric().withMessage(" sold count debe ser numerico"),
  check("active").isBoolean().withMessage("isActive debe ser true o false"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const order = [
  check("status").isString().withMessage("created, processed, complete, canceled debe ser true o false"),
  check("user_id").exists().isNumeric().withMessage("debe colocar un user id al producto comprado y este debe ser numerico"),
  // el front debe verificar que el usuario que envia la order exista en la dB
  // el front debe verificar que el contenido de products[0] no posea products_id repetidos y su count sea mayor o igual a 1.
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

const review = [
  check("review_id").isNumeric().withMessage("review id debe ser numerico"),
  check("rating").isNumeric().withMessage("rating  debe ser numerico"),
  check("reviewDate").isDate().withMessage("reviewDate debe de ser una fecha"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

const newsletter = []

const enter = [
  check("user_id").isEmpty().withMessage("no podes pasar un user id"),
  check("role").exists().isNumeric().withMessage("role debe ser numerico"),
  check("refreshToken").not().exists().withMessage("no podes modificar el refresh token"),
  check('isActive').isEmpty().withMessage("no podes modificar isActive"),
  check('needPasswordReset').isEmpty().withMessage("no podes modificar needPasswordReset"),
  check('isLogged').isEmpty().withMessage("no podes modificar isLogged"),
  
  
  //estos si se pueden modificar
  check('username').exists().isString().withMessage("el username debe ser un string"), // se deben verificar si el user id ya existe en la base de datos pero por otro lado.
  check("name").exists().isString(),
  check("password").isString().isLength({ min: 6 }).withMessage("la password debe tener al menos 6 caracteres"),
  check("email").isEmail(),
  check("profilePicture").isURL().withMessage("La foto de perfil debe ser una url"),
  check("defaultShippingAddress").exists().isString().withMessage("defaultShippingAddress es requerido y debe ser un string"),
  check("surname").isString().withMessage("el surname debe ser un string"),
  check("billingAddress").exists().isString().withMessage("el billingAddress debe ser un string y es requerido"),
  check("zipCode").isNumeric().withMessage("el zipCode debe un numero"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
]

const enterLogin = [
  check('username').exists().isString().withMessage("el username debe ser un string"),
  check("password").exists().isString().isLength({ min: 6 }).withMessage("la password debe tener al menos 6 caracteres"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]

module.exports = { user, product, order ,review, newsletter, enter, enterLogin};

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
