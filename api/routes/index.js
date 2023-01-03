const { Router } = require("express");
const router = Router();
const products = require("../apiServices/product/routes.js");
const refresh = require("../apiServices/refresh/routes.js");
const enter = require("../apiServices/enter/routes.js");
const category = require("../apiServices/category/routes.js");
const brand = require("../apiServices/brand/routes.js");
const country = require("../apiServices/country/routes.js");
const subcategory = require("../apiServices/subcategories/routes.js");
const user = require("../apiServices/user/routes.js");
const review = require("../apiServices/review/routes.js");
const order = require("../apiServices/order/routes.js");
const favorite = require("../apiServices/favorite/routes.js");
const newsletter = require("../apiServices/newsletter/routes.js");
const verify = require("../apiServices/verify/routes.js");
const generateTestUsername = require("../middlewares/generateTestUsername.js");
const verifyJWT = require("../middlewares/verifyJWT.js");
router.use("/verify", verify);
router.use("/enter", enter);
router.use("/refresh", refresh);
//todo middleware de asignacion de access token en caso de que no exista
//router.use(verifyJWT); // !validacion de JWT
router.use(generateTestUsername);
router.use("/newsletters", newsletter);
router.use("/categories", category);
router.use("/subcategories", subcategory);
router.use("/brands", brand);
router.use("/countries", country);
router.use("/products", products);
router.use("/reviews", review);
router.use("/orders", order);
router.use("/users", user);
router.use("/favorites", favorite);

//router.use

module.exports = router;
