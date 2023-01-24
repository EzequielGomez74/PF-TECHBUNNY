const {
  Product,
  Review,
  Cart,
  Order,
  User,
} = require("../../../services/db/db.js");
const orderTest = require("../reviewGenerator/reviews.json");
const cartController = require("../../../apiServices/cart/controller");
const orderController = require("../../../apiServices/order/controller");
const reviewGenerator = require("../reviewGenerator/reviewGenerator");

// async function maxProducts() {
//   const products = await Product.findAll();
//   return products.length;
// }
// async function maxUsers() {
//   const users = await User.findAll();
//   return users.length;
// }
// const MAX_PRODUCTS = (async () => {
//   return await maxProducts();
// })();
// const MAX_USERS = (async () => {
//   return await maxUsers();
// })();

//? del 10 al 93 (user_id) crear un USER
//? rollear el product_id y el count entre entre (1 y 3)
//? usando cartController.addproduct() agregar todo al user_id
//? usando orderController.createOrder() crear la order para el user_id
//? usando orderController.updateOrder() la paso a "completed"
//? avanzar M cantidad de tiempo  entre ( 1 dia y 10 dias ) * userDesire |
//? decrementar un N el tiempo minimo y maximo

class UserClass {
  #desire;
  #lazy;
  moneyAvailable;
  time;
  cancelOrderRatio;
  model;
  constructor(model) {
    this.model = model;
    this.time = this.#getTimes();
    this.#desire = 1 + Math.random() * 0.5;
    this.#lazy = Math.random() > 0.5 ? false : true;
    this.cancelOrderRatio = 1 + Math.random() * 10;
    this.moneyAvailable = 6000 + Math.random() * 12000;
  }
  spendTime(ammountOfTime) {
    if (this.#lazy) {
      this.time += (ammountOfTime + ammountOfTime * 0.3) * this.#desire;
    } else {
      this.time += (ammountOfTime - ammountOfTime * 0.3) * this.#desire;
    }
    this.#desire = this.#desire + 0.05;
  }

  #getTimes(type) {
    const now = Date.now();
    const aYear = 31556926 * 1000;
    return now - aYear + aYear * (Math.random() * 0.4);
  }
  static async fetchUser(user_id) {
    const model = await User.findByPk(user_id);
    return new UserClass(model);
  }
}

async function orderGenerator() {
  try {
    const MAX_USERS_SHOW = 21;
    const CURRENT_TIME = Date.now();
    const TIME_TO_SPEND = (604800 + 302400) * 1000; // 1 semana y media
    for (let user_id = 10; user_id < MAX_USERS_SHOW; user_id++) {
      let user = await UserClass.fetchUser(user_id);
      //$ va a realizar  desde 10 hasta 50 - aproximadamente 1 por semana
      //let ordersLeft = Math.floor(Math.random() * 50 + 10);

      //
      while (user.time < CURRENT_TIME && user.moneyAvailable > 0) {
        //!TEST
        const timestamp = user.time; // Unix timestamp in milliseconds
        const date = new Date(timestamp);
        const iso8601 = date.toISOString();

        const productsToBuy = Math.floor(Math.random() * 3 + 1); // entre 1 y 4 productos
        for (let i = 0; i < productsToBuy; i++) {
          //? usando cartController.addproduct() agregar todo al user_id
          const ammountToBuy = Math.floor(Math.random() * 2 + 1); // entre 1 y 2 productos
          const product_id_rolled = Math.floor(Math.random() * 830 + 1);
          // const { product_id, price, count, product_name } = body;
          const productFound = await Product.findByPk(product_id_rolled);
          const { product_id, price, name } = productFound.dataValues;
          await cartController.addProduct(
            { product_id, price, count: ammountToBuy, product_name: name },
            user_id
          );
          //? el user deja un review del producto comprado
          if (Math.random() < 0.7) await reviewGenerator(user_id, product_id);
        }
        //? usando orderController.createOrder() crear la order para el user_id
        const order_id = await orderController.createRelativeOrder(
          user_id,
          user.time
        );
        //? usando orderController.updateOrder() la paso a "completed"
        if (Math.random() * 100 > user.cancelOrderRatio) {
          await orderController.updateOrder(order_id, "completed");
          const currentOrder = await Order.findOne({ where: { order_id } });
          user.moneyAvailable -= currentOrder.dataValues.total;
        } else {
          await orderController.updateOrder(order_id, "canceled");
        }
        //? avanzar X cantidad de tiempo  entre ( 1 semana y media aprox ) * userDesire
        user.spendTime(TIME_TO_SPEND);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = orderGenerator;
