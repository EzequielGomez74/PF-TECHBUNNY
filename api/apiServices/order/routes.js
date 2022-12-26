const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const validate = require("../../scripts/bodyValidators/index.js");


router.post("/", validate.order, async (req, res) => {
  try {
    res.status(200).json({ order_id: await controller.createOrder(req.body) });
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
