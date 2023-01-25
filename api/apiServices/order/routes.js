// * En esta ruta se generan nuevas ordenes, se generan preferencias de mercadopago, modifica ordenes existentes y devuelven las ordenes solicitadas.

// todo hablar con back para ver si creamos un get all orders (limitado a 10 o 20 orders)
require("dotenv").config();
const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const validate = require("../../scripts/bodyValidators/index.js");
const { OrderProduct } = require("../../services/db/db.js");
const mercadopago = require("mercadopago");
const { access_token_mp } = require("../../config/mercadopago.js");
const verifyJWT = require("../../middlewares/verifyJWT");
const requiredAccess = require("../../middlewares/requiredAccess");
//!TEST
// const createOrderCarrousel = require("../../scripts/analyticsScripts/createOrderCarrousel");
// const createFavoriteCarrousel = require("../../scripts/analyticsScripts/createFavoriteCarrousel");
// router.post("/carrousel", async (req, res) => {
//   try {
//     //res.status(200).json({ res: await createOrderCarrousel(2) });
//     res.status(200).json({ res: await createFavoriteCarrousel(2) });
//   } catch (error) {
//     res.status(500).json({ err: error.message });
//   }
// });
//!TEST

router.use(verifyJWT); // !validacion de JWT
//!     ----- ACCESO USER  -----
router.use(requiredAccess(2));

// $ Esta ruta genera las preferencias de mercadopago para proseguir con el pago. PARAMS { order_id }
// $ ESTA RUTA RECIBE POR PARAMS { order_id } , Y RETORNA LOS DETALLES DE ESA ORDEN
router.get("/pagar/:order_id", async (req, res) => {
  try {
    mercadopago.configure({
      access_token:
        "TEST-3131783442482356-122810-8c7720ae26aa2dc8fc655b6acac2e721-240429259",
    });
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
    // TODO: manejar casos de failure y pending con front

    // let path = "http://localhost:3000/feedback";
    // if (process.env.NODE_ENV === "production") {
    //   path = "https://pf-techbunny-lake.vercel.app/feedback";
    // }

    let preference = {
      items: carrito,
      back_urls: {
        success: "https://pf-techbunny-lake.vercel.app/feedback", // ! ACA VA SI FUE PAGO EXITOSO
        failure: "https://pf-techbunny-lake.vercel.app/feedback", // ! SI EL PAGO FALLA
        pending: "https://pf-techbunny-lake.vercel.app/feedback", // ? PAGO PENDIENTE
      },
      auto_return: "approved",
    };
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
    res.send({ preferenceId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// $ Esta ruta genera nuevas ordenes. body{ "user_id": "2", "status": "processed", "products": [ { "product_id": "1", "count": 1 }, { "product_id": "2", "count": 1 }, { "product_id": "3", "count": 1}		}
router.post("/:user_id", async (req, res) => {
  try {
    res.status(200).json({
      order_id: await controller.createOrder(req.params.user_id),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// $ Esta ruta modifica una orden para cambiar el estado de la misma. PARAMS { order_id } BODY { data }
router.put("/:order_id", async (req, res) => {
  //!! CAMBIOS EN EL ARGUMENTO DE UPDATEORDER linea 88 (se saco user_id)
  try {
    console.log("req.body ", req.body);
    const { order_id } = req.params;
    if (order_id && req.body.status) {
      console.log("1");
      // para cuando el admin use dashboard
      return res
        .status(200)
        .send(await controller.updateOrder(order_id, req.body.status));
    }
    if (order_id) {
      // para la compra
      console.log("2");
      res
        .status(200)
        .send(await controller.updateOrderData(order_id, req.body));
    }
  } catch (error) {
    res.status(407).send(error.message);
  }
});

// /users?user_id=1&order_id=2  /users?user_id=1
router.get("/", async (req, res, next) => {
  const { user_id, order_id } = req.query;
  try {
    if (Object.keys(req.query).length === 0) {
      return next();
    }
    if (user_id) {
      if (order_id) {
        res.status(200).json(await controller.getOrderById(order_id));
      } else {
        res.status(200).json(await controller.getOrdersByUserId(user_id));
      }
    } else {
      res.status(200).send({ status: "INVALID USER ID" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//!     ----- ACCESO ADMIN  -----
router.use(requiredAccess(3));

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getOrders());
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
