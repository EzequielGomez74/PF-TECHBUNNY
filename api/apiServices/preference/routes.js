require("dotenv").config();
const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const validate = require("../../scripts/bodyValidators/index.js");
const { OrderProduct } = require("../../services/db/db.js");
const mercadopago = require("mercadopago");
const { access_token_mp } = require("../../config/mercadopago.js");
const verifyJWT = require("../../middlewares/verifyJWT");
const requiredAccess = require("../../middlewares/requiredAccess");

router.get("/:preference_id", async (req, res) => {
  console.log("req.params ", req.params);
  try {
    res.status(200).send(await controller.getOrderByPreferenceId(req.params));
  } catch (error) {
    res.status(408).send(error.message);
  }
});

module.exports = router;
