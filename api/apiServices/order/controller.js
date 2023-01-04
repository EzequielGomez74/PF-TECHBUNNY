const {
<<<<<<<<< Temporary merge branch 1
  Order,
  Product,
  OrderProduct,
  User,
} = require("../../services/db/db.js");
const Sequelize = require("sequelize");
const { sendMail } = require("../../services/mailer/emailer.js");


async function createOrder({ status, user_id, products }) {

  try {
    const user = await User.findByPk(user_id);
    const newOrder = { status, user_id };
    const order = await Order.create(newOrder);
    let suma = 0;

    await products.forEach(async (product) => {
      const productoDb = await Product.findByPk(product.product_id); // ACA TRAEMOS LOS PRODUCTOS CON SU PRICE
      await order.addProduct(product.product_id, {
        // CREA LOS DATOS DE LA TABLA INTERMEDIA

        through: {
          product_name: productoDb.name,
          count: product.count,
          price: productoDb.dataValues.price,
        },
      });
      suma += product.count * productoDb.dataValues.price; // CALCULA EL TOTAL DE LA ORDER
      await Order.update(
        { total: suma },
        { where: { order_id: order.dataValues.order_id } }
      );
    });
    const object = { ...order, type: "order" };
    sendMail(user.email, object);
    return order.order_id;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getOrders() {
  try {
    const getOrders = await Order.findAll();
    return getOrders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getOrderById(order_id) {
<<<<<<<<< Temporary merge branch 1
  // busca por order o por user id
  try {
    const orde1 = await Order.findAll({
      where: { order_id },
      include: {
        model: Product,
        attributes: ["product_id"],
        through: {
          attributes: ["count"],
        },
      },
    });

    const orderById = orde1.map((el) => {
      //ordenamos los datos para mandarlos limpios al front
      return {
        ...el,
        products: el.Products.map((el) => {
          return { product_id: el.product_id, count: el.OrderProduct.count };
        }),
      };
    });

    return orderById;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getOrderByUserId(user_id) {
  // busca por order o por user id
  try {
    const orde1 = await Order.findAll({
      where: { user_id },
      include: {
        model: Product,
        attributes: ["product_id"],
        through: {
          attributes: ["count"],
        },
      },
    });

    const clearResponse = orde1.map((el) => {
      //ordenamos los datos para mandarlos limpios al front
      return {
        ...el,
        products: el.Products.map((el) => {
          return { product_id: el.product_id, count: el.OrderProduct.count };
        }),
      };
    });
=========
	// BUSCA UNA ORDER POR ID
	try {
		const orde1 = await Order.findAll({
			where: { order_id },
			include: {
				model: Product,
				attributes: ["product_id"],
				through: {
					attributes: ["count"],
				},
			},
		});

		console.log(orde1);
		const orderById = orde1.map((el) => {
			//ordenamos los datos para mandarlos limpios al front
			return {
				...el.dataValues,
				Products: el.Products.map((el) => {
					return { product_id: el.product_id, count: el.OrderProduct.count };
				}),
			};
		});

		return orderById;
	} catch (error) {
		throw new Error(error.message);
	}
}

async function getOrderByUserId(user_id) {
	// BUSCA TODAS LAS ORDENES DEL USUARIO
	try {
		const orde1 = await Order.findAll({
			where: { user_id },
			include: {
				model: Product,
				attributes: ["product_id"],
				through: {
					attributes: ["count"],
				},
			},
		});

		const clearResponse = orde1.map((el) => {
			//ordenamos los datos para mandarlos limpios al front
			return {
				...el.dataValues,
				Products: el.dataValues.Products.map((ele) => {
					return {
						product_id: ele.dataValues.product_id,
						count: ele.dataValues.OrderProduct.count,
						// price: ele.OrderProduct.price
					};
				}),
			};
		});
>>>>>>>>> Temporary merge branch 2

    return clearResponse;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateOrder(order, data) {
<<<<<<<<< Temporary merge branch 1
  try {
    await Order.update({status:data.status}, { where: { order_id: order } });
    return "Orden modificada con exito!";
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  getOrders,
  getOrderByUserId,
};

async function updateOrder(order, data) {
  try {
    await Order.update({ status: data.status }, { where: { order_id: order } });
    return "Orden modificada con exito!";
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  getOrders,
  getOrderByUserId,
=========
	try {
		await Order.update({ status: data.status }, { where: { order_id: order } });
		return "Orden modificada con exito!";
	} catch (error) {
		throw new Error(error.message);
	}
}
module.exports = {
	createOrder,
	getOrderById,
	updateOrder,
	getOrders,
	getOrderByUserId,
>>>>>>>>> Temporary merge branch 2
};
