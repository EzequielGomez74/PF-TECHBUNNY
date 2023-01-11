const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");
const router = Router();

router.put("/:code",validate.validateUser, async (req, res) => {
  const code = req.params.code;
  try {
    res.status(200).json({ status: await controller.validateUser(code) });
  } catch (error) {
    res.status(400).send("Error al procesar el codigo de verificacion");
  }
});
//todo crear ruta de refresh del validation code del email
router.put("/", validate.refreshValidation,async (req, res) => {
  const { email } = req.body;
  try {
    res.status(200).json({ status: await controller.refreshValidation(email) });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
module.exports = router;
