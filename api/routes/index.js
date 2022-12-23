const { Router } = require("express");
const router = Router();
const products = require("../apiServices/product/routes.js");
const refresh = require("../apiServices/refresh/routes.js");
const enter = require("../apiServices/enter/routes.js");
const category = require("../apiServices/category/routes.js");
const subcategory = require("../apiServices/subcategory/routes.js");
const brand = require("../apiServices/brand/routes.js");
const country = require("../apiServices/country/routes.js");
const users = require("../apiServices/users/routes.js");
const verifyJWT = require("../middlewares/verifyJWT.js");
const review = require("../apiServices/review/routes.js");

router.use("/enter", enter);
router.use("/refresh", refresh);
router.use(verifyJWT); //middleware de validacion de JWT
router.use("/products", products);
router.use("/categories", category);
router.use("/subcategories", subcategory);
router.use("/brands", brand);
router.use("/reviews", review);
router.use("/countries", country);
router.use("/users", users);

//router.use

module.exports = router;
