const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();

router.post("/", async (req, res) => {
  try {
    res.status(200).json({ order_id: await controller.createOrder(req.body) });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/:order_id", async (req, res) => {
  try {
    if (req.params.order_id){
      res.status(200).json(await controller.getOrderById(req.params.order_id));
    }
      else{
      res.status(200).json(await controller.getOrders());
      }
  } catch (error) {
    res.sendStatus(400);
  }
});

router.put("/:order_id", async (req, res) => {
  try {
    const data=req.body;
    if (req.params.order_id)
      res.status(200).send(await controller.updateOrder(req.params.order_id,data));
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
