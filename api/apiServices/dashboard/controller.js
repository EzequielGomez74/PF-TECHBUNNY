const { User, Product, OrderProduct  } = require("../../services/db/db.js");
const emailer = require("../../services/mailer/emailer.js");


async function dashboardData() {
  try {
    let usersData = {};
    let ordersData = {};
    let productsData = {};
    let newsletterData = {};
    let activeUsers = 0;
    const totalUsers = await User.findAndCountAll()
    totalUsers.rows.map((el) => {  if (el.accessToken !== null) activeUsers++ }) // cuenta usuarios activos
    console.log("usuarios logeados", activeUsers)
    console.log("total de usuarios registrados", totalUsers.count)

    return totalUsers.count
  } catch (error) {
    throw new Error(error);
  }
}




module.exports = {
  dashboardData,
};
