const { Router } = require("express");
const router = Router()

const products = require("../apiServices/product/routes.js");

router.use("/products", products);

module.exports = router;