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