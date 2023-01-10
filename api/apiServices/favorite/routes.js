const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");
const verifyJWT = require("../../middlewares/verifyJWT");

const router = Router();

router.use(verifyJWT); // !validacion de JWT
//!     ----- ACCESO USER  -----
//router.use(requiredAccess(2));
router.get("/:user_id", async (req, res) => {
  try {
    if (req.params.user_id)
      res.status(200).json(await controller.getAllFavorite(req.params.user_id));
    else res.sendStatus(400);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    res.status(200).send(await controller.createFavorite(req.body));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
