const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

router.post("/", async (req, res) => {
  const { user, pwd } = req.body;
  try {
    if (req.query) {
      res.status(200).json(await controller.handleNewUser(user, pwd));
    } else {
      res.status(200).json(await controller.handleLogin(user, pwd));
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

module.export = router;
