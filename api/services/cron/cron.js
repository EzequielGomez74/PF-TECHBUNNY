const cron = require("node-cron");
const orderController = require("../../apiServices/order/controller");
const statisticController = require("../../apiServices/statistic/controller");

//$ cleaner de "procesed" orders -> cada hora
cron.schedule("1 * * * *", async () => {
  //? Cada 1 hora checkea el "status" de cada order si esta failed y paso 1 hora
  //? de su creacion la pasa a status "cancelled"
  try {
    console.log("CLEANING");
    await orderController.checkOrderStatus();
  } catch (error) {
    throw new Error(error.message);
  }
});

//$ generar statistics -> cada dia
cron.schedule("0 0 * * *", async () => {
  try {
    await statisticController.generateAllStatistics();
    console.log("STATISTICS GENERATED");
  } catch (error) {
    throw new Error(error.message);
  }
});
