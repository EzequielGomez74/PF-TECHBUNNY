const cron = require("node-cron");
const orderController = require("../../apiServices/order/controller");
const timestamp = "2023-01-18 19:16:20";
const date = new Date(timestamp);
const unixTime = date.getTime() / 1000;
cron.schedule("* * * * *", async () => {
  //? Cada 1 hora checkea el "status" de cada order si esta failed y paso 1 hora
  //? de su creacion la pasa a status "cancelled"
  try {
    console.log("CLEANING");
    await orderController.checkOrderStatus();
  } catch (error) {
    throw new Error(error.message);
  }
});
