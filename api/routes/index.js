const { Router } = require("express");
const router = Router();
const register = require("../apiServices/register/routes.js");
const products = require("../apiServices/product/routes.js");

//router.use("/register",register);
router.use("/products", products);

module.exports = router;
