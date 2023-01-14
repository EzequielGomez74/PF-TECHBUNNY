const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    if (category)
      res.status(200).json(await controller.getSubcategoryByCategory(category));
    else res.status(200).json(await controller.getAllSubcategories());
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/", async (req, res) => {
	try {
		const {name,category}=req.body
		if (name,category) {
      console.log(name,category)
			res.status(200).json(await controller.createSubcategory(req.body));
		}
	} catch (error) {
		res.sendStatus(400);
	}
});

router.delete("/:subcategoryId", async (req, res) => {
  const { subcategoryId } = req.params;
  try {
    if (subcategoryId)
      res.status(200).json(await controller.deleteSubcategory(subcategoryId));
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
