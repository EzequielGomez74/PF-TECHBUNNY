const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");
const verifyJWT = require("../../middlewares/verifyJWT");
const requiredAccess = require("../../middlewares/requiredAccess.js");
const router = Router();
//

router.get("/", async (req, res) => {
  try {
    if (req.query)
      res.status(200).json(await controller.getAllReviewsBy(req.query));
    else res.sendStatus(400);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.use(verifyJWT); // !validacion de JWT
//!     ----- ACCESO USER  -----
router.use(requiredAccess(2));
router.post("/", async (req, res) => {
  const review = req.body;
  try {
    res.status(200).send(await controller.createReviews(review));
  } catch (error) {
    res.status(400).send(error);
  }
});

//!     ----- ACCESO ADMIN  -----
router.use(requiredAccess(3));
router.put("/", validate.review, async (req, res) => {
  try {
    res.status(200).send(await controller.updateReviews(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
});
// param: {
//   review_id: 1;
// }
router.delete("/:review_id", async (req, res) => {
  const { review_id } = req.params;
  try {
    res.status(200).send(await controller.deleteReviews(review_id));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
