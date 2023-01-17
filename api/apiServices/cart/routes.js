// * En esta ruta se agregan productos a favoritos del usuario y se puede pedir por GET todos los favoritos por user_id.

const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");
const verifyJWT = require("../../middlewares/verifyJWT");
const requiredAccess = require("../../middlewares/requiredAccess");
const router = Router();

router.use(verifyJWT); // !validacion de JWT
//!     ----- ACCESO USER  -----
router.use(requiredAccess(2));
//$ Esta ruta recibe por PARAMS {user_id} 
//$ Y retorna todos los productos correspondientes a este usuario.
router.get("/:user_id", async (req, res) => {
  try {
    res.status(200).json(await controller.getCart(req.params.user_id));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$  Esta ruta recibe por BODY un objeto que tiene: { product_id , price, count, product_name }  
//$  Por PARAMS recibe {user_id} para poder agregar el producto al carrito del usuario correspondiente.
router.post("/:user_id", async (req, res) => {
  try {
    res
      .status(200)
      .send(await controller.addProduct(req.body, req.params.user_id));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ Esta ruta espera un BODY { product_id , action (plus or minus) } y por param {user_id}
//$ Es para sumar o restar  unidades de un producto del carrito correspondiente a un user_id .
//$ tiene una verificacion para que el usuario no pueda sumar mas unidades de las que el producto tiene en stock 
//$ tampoco puede restar si tiene 1 sola unidad en el carrito . 
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
// $ Esta ruta espera recibir por PARAMS :{ user_id } 
// $ Elimina todos los productos correspondientes a ese usuario.
router.delete("/deleteCart/:user_id", async (req, res) => {
  try {
    res.status(200).json(await controller.deleteCart(req.params, req.body));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//? ESTE ELMIINA UNA SOLA FILA DE LA TABLA CART
// $ Esta ruta recibe por BODY { user_id , product_id }
// $ Y elimina  el producto COMPLETO del carrito . (Pero puede que haya mas productos asique el carrito sigue existiendo)
router.delete("/:user_id", async (req, res) => {
  const { product_id } = req.body;
  try {
    res.status(200).json(await controller.deleteCart(req.params, product_id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
