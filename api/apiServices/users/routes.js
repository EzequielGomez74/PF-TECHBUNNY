const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();

router.get("/:user_id", async (req, res) => {
  try {
    console.log("a")
    if (req.params.user_id)
      res.status(200).json(await controller.getUserById(category));
    else res.status(200).json(await controller.getAllUsers());
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
