/*{
	"product_id": 6,
	"price": 123,
	"count": 2,
	"product_name": "asd"
}
*/
const cartController = require("../../apiServices/cart/controller");
const productsToAdd = require("./products.json");
const orderController = require("../../apiServices/order/controller");
async function cartGenerator() {
  await Promise.all(
    productsToAdd.map(async (p) => {
      await cartController.addProduct(p, 2);
      return null;
    })
  );

  // productsToAdd.forEach(async (p) => {
  // });
  await orderController.createOrder(2);
}
module.exports = cartGenerator;
