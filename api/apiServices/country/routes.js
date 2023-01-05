// * En esta ruta se solicitan las countries del usuario que se registro.


const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();


// $ GET 	/countries											←-------------------- Trae todas las countries de los users

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllCountries());
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
