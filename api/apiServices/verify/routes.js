const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();

router.put("/:code", async (req, res) => {
  const code = req.params.code;
  try {
    res.status(200).json({ status: await controller.validateUser(code) });
  } catch (error) {
    res.status(400).send("Error al procesar el codigo de verificacion");
  }
});

module.exports = router;
