const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");

const router = Router();
//NEW USER
router.get("/:carrouselType", async (req, res) => {
  const { carrouselType } = req.params;
  let username = "";
  if (req.accessToken) {
    username = req.username;
  }
  try {
    res
      .status(200)
      .json(await controller.getCarrousel(carrouselType, username));
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

module.exports = router;
