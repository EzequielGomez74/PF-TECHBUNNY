<<<<<<< HEAD
const {Router}=require("express")
const controller=require("./controller")
const router=Router()

router.get("/",async(req,res)=>{
    const {category}=req.query.category
    if (category) {
        try {
            res.sendStatus(200).json(await controller.filtroSubc(category))
        } catch (error) {
            res.status(400).send("ERROR-me gustan los negros")            
        }
    }else{
        try {
            res.sendStatus(200).json(await controller.allSubc())
        } catch (error) {
            res.status(400).send(error);
        }
    }
})

module.exports= router;
=======
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

module.exports = router;
>>>>>>> 66b7519adfc6f3782986a71883b225b8e9ec575c
