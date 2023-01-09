// * En esta ruta se agregan productos a favoritos del usuario y se puede pedir por GET todos los favoritos por user_id.



const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");

const router = Router();

//$ Esta ru
router.get("/:user_id", async (req, res) => {
  try {
    res.status(200).json(await controller.getCart(req.params.user_id));
  } catch (error) {
    res.status(400).send(error.message);
  }
});


//$ Esta ruta busca el pro body { product_id , price, count, product_name } PARAMS { user_id }
router.post("/:user_id", async (req, res) => {
  try {
    res.status(200).send(await controller.addProduct(req.body, req.params.user_id));
  } catch (error) {
    res.status(400).send(error.message);
  }
});


//$ Esta ruta espera un BODY { product_id , user_id, action (plus or minus) }
router.put("/updateCount/:user_id", async (req, res) => {
  try {
    res.status(200).json(await controller.updateCount(req.params.user_id, req.body));
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
