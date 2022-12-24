const { Order, Product } = require("../../services/db/db.js");

async function createOrder({ status, user_id, products }) {
  //product = [product_id,product_id,product_id,product_id]
  //
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

module.exports = { createOrder };
