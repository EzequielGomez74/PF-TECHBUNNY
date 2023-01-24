const { Router } = require("express");
const controller = require("./controller.js");

const requiredAccess = require("../../middlewares/requiredAccess.js");
const validate = require("../../scripts/bodyValidators/index.js");
const verifyJWT = require("../../middlewares/verifyJWT");

const router = Router();
//GET 	/products                                                                             <-- Trae todos los productos
//GET 	/products?category=Monitores&brand=Razer	query={category:"Monitores",brand:"Razer"}	<-- Trae todos los Monitores de marca razer

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    if (req.query)
      res
        .status(200)
        .json(await controller.getAllProductsBy(req.query, req.username));
    else res.status(200).json(await controller.getAllProducts(req.username));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET 	/products/2							                                                              <-- Trae el producto de product_id = 2
router.get("/:product_id", async (req, res) => {
  const cookie = req.cookies;
  const { product_id } = req.params;
  try {
    res
      .status(200)
      .json(await controller.getProductById(product_id, req.username));
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
});

router.use(verifyJWT); // !validacion de JWT
//!     ----- ACCESO ADMIN  -----
router.use(requiredAccess(3));

//POST	/products					body={name:"Mouse Pepito",image:"asd.png"...}	                      <-- Crea un nuevo producto. el body debe respetar el modelo Product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (req.file) {
      const newBody = await controller.uploadImage(req.body, req.file);
      res.status(200).send(await controller.createProduct(newBody));
    } else {
      res.status(200).send(await controller.createProduct(req.body));
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//PUT	/products					body={product_id:1,name:"Mouse Pepe"...}	                            <-- Modifica un producto existente . el body debe respetar el modelo Product
router.put("/", upload.single("image"), async (req, res) => {
  try {
    if (req.file) {
      const newBody = await controller.uploadImage(req.body, req.file);
      res.status(200).send(await controller.updateProduct(newBody));
    } else {
      res.status(200).send(await controller.updateProduct(req.body));
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//DELETE	/products/3									                                                        <-- Borra el producto de product_id = 3 (El borrado es lógico)
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    res.status(200).send(await controller.deleteProduct(productId));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
