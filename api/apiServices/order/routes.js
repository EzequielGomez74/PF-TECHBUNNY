// * En esta ruta se generan nuevas ordenes, se generan preferencias de mercadopago, modifica ordenes existentes y devuelven las ordenes solicitadas.

// todo hablar con back para ver si creamos un get all orders (limitado a 10 o 20 orders)

const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const validate = require("../../scripts/bodyValidators/index.js");
const { OrderProduct } = require("../../services/db/db.js");
const mercadopago = require("mercadopago");
const {access_token_mp} = require("../../config/mercadopago");



// $ Esta ruta retorna todas las orders del usuario por id con QUERY { user_id }
router.get("/", async (req, res) => {
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


// $ Esta ruta retorna los detalles de una orden por PARAMS { order_id }.
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


// $ Esta ruta genera las preferencias de mercadopago para proseguir con el pago. PARAMS { order_id }
router.get("/pagar/:order_id", async (req, res) => {
	try {

		mercadopago.configure({
			access_token: access_token_mp,
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
		let preference = {
			items: carrito,
			back_urls: {
				success: "http://localhost:3000/feedback",
				failure: "http://localhost:3000/feedback", 
				pending: "http://localhost:3000/feedback", 
			},
			auto_return: "approved",
		};
		const response = await mercadopago.preferences.create(preference);
		const preferenceId = response.body.id;

		res.send(preferenceId);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// $ Esta ruta genera nuevas ordenes. body{ "user_id": "2", "status": "processed", "products": [ { "product_id": "1", "count": 1 }, { "product_id": "2", "count": 1 }, { "product_id": "3", "count": 1}		}
router.post("/:user_id", async (req, res) => {
	try {
		res.status(200).json({Mensaje: `La orden N° ${await controller.createOrder(req.params.user_id)} se creo con exito`} );
	} catch (error) {
		res.status(400).json({error: error.message});
	}
});


// $ Esta ruta modifica una orden para cambiar el estado de la misma. PARAMS { order_id } BODY { data } 
router.put("/:order_id", async (req, res) => {
	try {
		const { status, user_id} = req.body;
		const { order_id } = req.params
		if (order_id)
			res.status(200).send(await controller.updateOrder( user_id, order_id, status ));
	} catch (error) {
		res.status(400).send(error.message);
	}
});


module.exports = router;
