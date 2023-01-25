//? GET ORDERS BY ID
const {
  Order,
  OrderProduct,
  Product,
  User,
  Cart,
} = require("../../services/db/db.js");
const { sendMail } = require("../../services/mailer/emailer.js");
const controller = require("./controller.js");
const moment = require("moment");
async function getOrderByPreferenceId(preference_id) {
  try {
    const order = await Order.findAll({ where: preference_id });
    console.log("order de preferencessssss", order);
    return order;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getOrderByPreferenceId,
};
