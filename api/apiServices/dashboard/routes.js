
const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");
const router = Router();


router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.dashboardData());
  } catch (error) {
    res.status(400).json(error.message);
  }
});



module.exports = router;