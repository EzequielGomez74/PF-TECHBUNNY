const { Order,Product, OrderProduct } = require("../../services/db/db.js");
const Sequelize = require("sequelize");


async function createOrder({ status, user_id, products }) {
  //product = [product_id,product_id,product_id,product_id]
  // products = [
  //   { product_id: 1, count: 2 },
  //   { product_id: 2, count: 1 },
  // ];
  try {
    const newOrder = { status, user_id };
    const order = await Order.create(newOrder);    
    products.forEach(async (product) => {
      await order.addProduct(product.product_id, { through: { count: product.count } });
    });
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

async function getOrderById(order_id) { // busca por order o por user id
  try {
    const orde1 = await Order.findAll({
			where: { order_id },
			include: {
        model: Product,
				attributes:['product_id'],
				through: {
          attributes: ["count"],
				},
			},
		});

    const orderById = orde1.map((el) => { //ordenamos los datos para mandarlos limpios al front
      return  {
        order_id: el.order_id,
        status: el.status,
        user_id: el.user_id,
        products: el.Products.map((el) => {return { product_id: el.product_id,
        count: el.OrderProduct.count}}),
      }
    })

		return orderById;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getOrderByUserId(user_id) {	// busca por order o por user id
	try {
		const orde1 = await Order.findAll({
			where: { user_id },
			include: {
        model: Product,
				attributes:['product_id'],
				through: {
          attributes: ["count"],
				},
			},
		});

    const clearResponse = orde1.map((el) => { //ordenamos los datos para mandarlos limpios al front
      return  {
        order_id: el.order_id,
        status: el.status,
        user_id: el.user_id,
        products: el.Products.map((el) => {return { product_id: el.product_id,
        count: el.OrderProduct.count}}),
      }
    })

		return clearResponse;
	} catch (error) {
		throw new Error(error.message);
	}
}



async function updateOrder(order,data) {
  try {
    await Order.update({status:data.status}, { where: { order_id: order } });
    return "Orden modificada con exito!";
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { createOrder,getOrderById,updateOrder,getOrders , getOrderByUserId};
