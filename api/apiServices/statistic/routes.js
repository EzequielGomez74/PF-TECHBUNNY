const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");
const verifyJWT = require("../../middlewares/verifyJWT");
const requiredAccess = require("../../middlewares/requiredAccess.js");
const router = Router();

router.use(verifyJWT); // !validacion de JWT
//!     ----- ACCESO ADMIN  -----
router.use(requiredAccess(3));
router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllStatistics());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
