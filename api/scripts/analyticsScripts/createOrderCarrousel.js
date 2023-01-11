const {
  Order,
  Product,
  User,
  Category,
  Op,
  OrderProduct,
} = require("../../services/db/db");

async function createOrderCarrousel(user_id) {
  try {
    console.log(user_id);
    const allOrders = await Order.findAll({
      where: { user_id },
      include: { model: Product },
    });
    console.log(allOrders);
    let allProducts = [];
    allOrders.forEach((order) => {
      allProducts = [...allProducts, order.Products];
    });
    //console.log("P", allProducts);
    let categories = await Category.findAll({ raw: true });
    categories = categories.map((c) => c.name);
    console.log("categories ", categories);
    console.log("product 0 ", allProducts);
    //$agarro de todos los productos solo los mas caros sin repetir la categoria
    let newAllProducts = [];
    categories.forEach((category) => {
      let maxProduct;
      allProducts.forEach((p) => {
        if (p.category === category) {
          if (!maxProduct) {
            maxProduct = p;
          } else {
            if (p.price > maxProduct.price) maxProduct = p;
          }
        }
      });
    });

    return allProducts;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = createOrderCarrousel;
