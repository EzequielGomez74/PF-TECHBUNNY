const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const validate = require("../../scripts/bodyValidators/index.js");
const { OrderProduct } = require("../../services/db/db.js");
const mercadopago = require("mercadopago");
const verifyJWT = require("../../middlewares/verifyJWT");
const createOrderCarrousel = require("../../scripts/analyticsScripts/createOrderCarrousel");
// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token:
    "TEST-3131783442482356-122810-8c7720ae26aa2dc8fc655b6acac2e721-240429259",
});

//router.use(verifyJWT); // !validacion de JWT
//!     ----- ACCESO USER  -----
//router.use(requiredAccess(2));
router.post("/carrousel", async (req, res) => {
  try {
    res.status(200).json({ res: await createOrderCarrousel(2) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});
router.post("/", validate.order, async (req, res) => {
  // GENERAMOS UNA NUEVA ORDER
  console.log("1");
  try {
    res.status(200).json({ order_id: await controller.createOrder(req.body) });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/pagar/:order_id", async (req, res) => {
  // TRAEMOS LAS PREFERENCIAS DE PAGO DE UNA ORDER  ----- RETORNAMOS PREFERENCIAS PARA MERCADOPAGO (CONTENIDO DE CARRITO Y RESPONSES DE FAILURE, PENDING Y SUCCESS)
  try {
    const productos = await OrderProduct.findAll({
      where: { order_id: req.params.order_id },
    });
    const carrito = productos.map((el) => {
      return {
        title: el.dataValues.product_name,
        unit_price: Number(el.dataValues.price),
        quantity: Number(el.dataValues.count),
      };
    });

    let preference = {
      items: carrito,
      back_urls: {
        success: "http://localhost:3000/feedback", //front
        failure: "http://localhost:3000/feedback",
        pending: "http://localhost:3000/feedback",
      },
      auto_return: "approved",
    };
    // console.log(preference)
    const response = await mercadopago.preferences.create(preference);

    const preferenceId = response.body.id;
    res.send({ preferenceId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.get('/feedback', function (req, res) {
// 	res.json({
// 		Payment: req.query.payment_id,
// 		Status: req.query.status,
// 		MerchantOrder: req.query.merchant_order_id
// 	});
// });

router.get("/", async (req, res) => {
  // retorna todas las orders del usuario por id con QUERY
  const { user_id } = req.query;
  try {
    if (user_id) {
      res.status(200).json(await controller.getOrderByUserId(user_id));
    } else {
      res.status(200).json(await controller.getOrders());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:order_id", async (req, res) => {
  //retorna una sola por id con PARAMS
  const { order_id } = req.params;
  try {
    if (order_id) {
      res.status(200).json(await controller.getOrderById(order_id));
    } else {
      res.status(400).send("esta orden no existe");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:order_id", async (req, res) => {
  try {
    const data = req.body;
    if (req.params.order_id)
      res
        .status(200)
        .send(await controller.updateOrder(req.params.order_id, data));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
