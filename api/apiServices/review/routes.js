const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    if (req.query)
      res.status(200).json(await controller.getAllReviewsBy(req.query));
    else res.sendStatus(400);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", (req, res) => {
  const { review_id, description, rating } = req.body;
});

module.exports = router;
