const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();
//GET	/brands												<-- Trae todas las marcas
router.get("/", async (req, res) => {
  try {
    res.status(200).send(await controller.getAllBrands());
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
