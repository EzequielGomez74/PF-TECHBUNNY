const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllCountries());
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
