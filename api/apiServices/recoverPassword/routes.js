const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();

router.post("/", async (req, res) => {
  try {
    if (req.body)
      res
        .status(200)
        .json({ status: await controller.recoverPassword(req.body) });
    else throw new Error("INSUFICIENT PARAMETERS");
  } catch (error) {
    res.status(400).json({ status: "FAIL" });
  }
});

module.exports = router;
