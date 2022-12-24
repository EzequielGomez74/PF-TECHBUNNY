const { Order, Product } = require("../../services/db/db.js");

async function createOrder({ status, user_id, products }) {
  //product = [product_id,product_id,product_id,product_id]
  console.log("2");
  console.log(status, " ", user_id);
  try {
    const newOrder = { status, user_id };
    console.log("3");
    const order = await Order.create(newOrder); //1

    // await order.addProduct(products[0]);
    // await order.addProduct(products[1]);
    // await order.addProduct(products[2]);
    // await order.addProduct(products[3]);
    // await order.addProduct(products[4]);
    // products.forEach(async (p) => {
    //   await order.addProduct(p);
    // });
    //2
    //order.addProducts(products);

    const productsDb = [];
    products.forEach(async (p) => {
      let productDb = await Product.findOne({ where: { product_id: p } });
      console.log(productDb);
      productsDb.push(productDb);
    });
    console.log(productsDb);
    await order.addProduct(productsDb);
    return order.order_id;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createOrder };
