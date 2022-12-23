const { Order } = require("../../services/db/db.js");

async function createOrder({ status, user_id, products }) {
  //product = [product_id,product_id,product_id,product_id]
  console.log("2");
  console.log(status, " ", user_id);
  try {
    const newOrder = { status: "creada", user_id: 1 };
    console.log("3");
    const order = await Order.create(newOrder); //1

    await order.addProduct(products[0]);
    await order.addProduct(products[1]);
    await order.addProduct(products[2]);
    await order.addProduct(products[3]);
    await order.addProduct(products[4]);
    // products.forEach(async (p) => {
    //   await order.addProduct(p);
    // });
    //2
    //order.addProducts(products);
    return order.order_id;
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { createOrder };
