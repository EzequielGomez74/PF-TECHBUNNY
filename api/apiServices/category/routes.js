// * En esta ruta se solicitan las categorias generales de los productos


const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();

// $ GET 	/categories											←-------------------- Trae todas las categorias
router.get("/", async (req, res) => {
	try {
		res.status(200).json(await controller.getAllCategories());
	} catch (error) {
		res.sendStatus(400);
	}
});

router.post("/", async (req, res) => {
	try {
		const {name}=req.body
		if (name) {
			res.status(200).json(await controller.createCategory(req.body));
		}
	} catch (error) {
		res.sendStatus(400);
	}
});

router.delete("/:categoryId", async (req, res) => {
	const { categoryId } = req.params;
	try {
	  if (categoryId)
		res.status(200).json(await controller.deleteCategory(categoryId));
	} catch (error) {
	  res.sendStatus(400);
	}
  });

module.exports = router;
