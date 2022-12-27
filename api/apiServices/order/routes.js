const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const validate = require("../../scripts/bodyValidators/index.js");


router.post("/", validate.order, async (req, res) => {
  try {
    res.status(200).json({ order_id: await controller.createOrder(req.body) });
  } catch (error) {
    res.sendStatus(400);
  }
});


router.get("/", async (req, res) => { // retorna todas las orders del usuario por id con QUERY
  const { user_id } = req.query
  try {
    if (user_id){
    res.status(200).json(await controller.getOrderByUserId(user_id));
    }
    else {
      res.status(200).json(await controller.getOrders());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:order_id", async (req, res) => { //retorna una sola por id con PARAMS
  const { order_id } = req.params
  try {
    if (order_id){
      res.status(200).json(await controller.getOrderById(order_id));
    } else {
      res.status(400).send("esta orden no existe")
    }

  } catch (error) {
    res.status(400).send("fallo al pedir el order id");
  }
});


router.put("/:order_id", async (req, res) => {
  try {
    const data = req.body;
    if (req.params.order_id)
      res.status(200).send(await controller.updateOrder(req.params.order_id,data));
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
