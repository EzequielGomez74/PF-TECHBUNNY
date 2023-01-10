// * En esta ruta los usuarios se subscriben/desubscriben al newsletter para recibir ofertas de productos.
// * Ademas, se puede solicitar todos los subscriptores.

// todo crear ruta getallsubscribers que devuelva una lista de todos los emails activos, listo para enviar spam.

const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");
const router = Router();

//$ Esta ruta devuelve todas los emails subscriptos al newsletter { body.email }
router.post("/",validate.newsletter , async (req, res) => {
  try {
    res.status(200).json(await controller.subscribe(req.body));
  } catch (error) {
    res.status(400).json(error.message);
  }
});


//$ Esta ruta desubscribe del newsletter por PARAMS { newsletter_id } (busca en la tabla y elimina.)
router.delete("/:newsletter_id", async (req, res) => {
    try {
      res.status(200).send(await controller.unsubscribe(req.params));
    } catch (error) {
      res.status(400).send(error);
    }
  });

  module.exports = router;