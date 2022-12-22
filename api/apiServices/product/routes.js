const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    if (req.query)
      res.status(200).json(await controller.getAllProductsBy(req.query));
    else res.status(200).json(await controller.getAllProducts());
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

router.post("/", async (req, res) => {
  const product = { ...req.body };
  try {
    res.status(200).send(await controller.createProduct(product));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/", async (req, res) => {
  try {
    res.status(200).send(await controller.updateProduct(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    res.status(200).send(await controller.deleteProduct(productId));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
