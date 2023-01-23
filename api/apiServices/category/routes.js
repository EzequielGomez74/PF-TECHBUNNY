const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();
//GET 	/categories											<-- Trae todas las categorias
router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllCategories());
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/offers", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllOffers());
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/offers", async (req, res) => {
  try {
    const { category_id } = req.body;
    if (category_id) {
      res.status(200).json(await controller.createOffer(req.body));
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

router.delete("/offers", async (req, res) => {
  try {
    const { category_id } = req.body;
    if (category_id) {
      res.status(200).json(await controller.deleteOffer(category_id));
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      res.status(200).json(await controller.createCategory(req.body));
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

router.delete("/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    if (categoryId)
      res.status(200).json(await controller.deleteCategory(categoryId));
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;