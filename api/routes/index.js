const { Router } = require("express");
const router = Router();
const products = require("../apiServices/product/routes.js");
const refresh = require("../apiServices/refresh/routes.js");
const enter = require("../apiServices/enter/routes.js");
const categories = require("../apiServices/category/routes.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

router.use("/enter", enter);
router.use("/refresh", refresh);
//router.use(verifyJWT); //middleware de validacion de JWT
router.use("/products", products);
router.use("/categories", categories);

//router.use

module.exports = router;
