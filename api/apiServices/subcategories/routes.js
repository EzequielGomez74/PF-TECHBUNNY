// * En esta ruta se solicitan las SubCategorias de los productos



const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    if (category)
      res.status(200).json(await controller.getSubcategoryByCategory(category));
    else res.status(200).json(await controller.getAllSubcategories());
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
