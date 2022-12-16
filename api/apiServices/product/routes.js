const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllProducts());
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    res.status(200).json(await controller.getProductById(productId));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
