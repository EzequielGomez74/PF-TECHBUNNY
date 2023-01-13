// * En esta ruta se agregan productos a favoritos del usuario y se puede pedir por GET todos los favoritos por user_id.

const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");
const verifyJWT = require("../../middlewares/verifyJWT");
const router = Router();

//$ Esta ru
router.use(verifyJWT); // !validacion de JWT
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
    res
      .status(200)
      .send(await controller.addProduct(req.body, req.params.user_id));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ Esta ruta espera un BODY { product_id , user_id, action (plus or minus) }
router.put("/updateCount/:user_id", async (req, res) => {
  try {
    res
      .status(200)
      .json(await controller.updateCount(req.params.user_id, req.body));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//? ESTE ELMIINA TODO EL CART
// $ PARAMS { user_id } BODY { product_id, order_id }
router.delete("/deleteCart/:user_id", async (req, res) => {
  try {
    res.status(200).json(await controller.deleteCart(req.params, req.body));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//? ESTE ELMIINA UNA SOLA FILA DE LA TABLA CART
// $ PARAMS { user_id } BODY { product_id, order_id }
router.delete("/:user_id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { product_id } = req.body;
  try {
    res.status(200).json(await controller.deleteCart(req.params, product_id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
