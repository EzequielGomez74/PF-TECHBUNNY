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
//$ Esta ruta devuelve todas los productos favoritos del usuario por PARAMS (user_id)
router.get("/:user_id", async (req, res) => {
  try {
    if (req.params.user_id)
      res.status(200).json(await controller.getAllFavorite(req.params.user_id));
    else res.sendStatus(400);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ Esta ruta busca el producto en la tabla favoritos del usuario, si no existe, lo agrega. Si ya existe, lo quita. {body --- { product_id, user_id} }
router.post("/", async (req, res) => {
  try {
    res.status(200).send(await controller.createFavorite(req.body));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
