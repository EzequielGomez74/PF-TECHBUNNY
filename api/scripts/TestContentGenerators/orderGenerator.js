const { Product, Review, Cart } = require("../../services/db/db.js");
const orderTest = require("./reviews.json");
const cartController = require("../../apiServices/cart/controller");
const orderController = require("../../apiServices/order/controller");
let MAX = null;
async function maxProducts() {
  const products = await Product.findAll();
  return products.length;
}
(async () => {
  MAX = await maxProducts();
  console.log(MAX);
})();
async function orderGenerator(user_id) {
  const cant = Math.floor(Math.random() * 10 + 1);
  for (let i = 0; i < cant; i++) {
    const id = Math.floor(Math.random() * MAX + 1);
    let product = await Product.findByPk(id, { raw: true });
    const count = Math.floor(Math.random() * (product.stock - 1) + 1);
    const obj = {
      product_id: product.product_id,
      price: product.price,
      count,
      product_name: product.name,
    };
    // console.log(obj);
    await cartController.addProduct(obj, user_id);
  }
  await orderController.createOrder(user_id);
}
/*{
  "product_id": 6,
	"price": 123,
	"count": 2,
	"product_name": "asd"
}
*/
module.exports = orderGenerator;
