const { Router } = require("express");
const router = Router();
const auth = require("../apiServices/login/routes.js");
const register = require("../apiServices/register/routes.js");
const products = require("../apiServices/product/routes.js");
const enter = require("../apiServices/enter/routes.js");

//router.use("/register",register);
//router.use("/auth",login)

//router.use("/enter",enter)
router.use("/products", products);

module.exports = router;
