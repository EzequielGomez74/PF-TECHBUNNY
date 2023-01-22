const { create } = require("qrcode");
const {
  User,
  Order,
  Brand,
  OrderProduct,
  Product,
} = require("../../services/db/db.js");

async function getAllStatistics() {
  const allStatisticsData = {};
  allStatisticsData.usersData = await createUserData();
  allStatisticsData.brandsData = await createBrandsData();
  //allStatisticsData.categoriesData = await createcategoryData();
  return allStatisticsData;
}

async function createCategoryData() {}

async function createBrandsData() {
  const data = [];
  const brands = await Brand.findAll();
  const newBrands = await Promise.all(
    brands.map(async (brand) => {
      const rev = await getBrandRevenue(brand.name);
      return {
        id: brand.name,
        label: brand.name,
        value: rev,
        color: "hsl(200, 50%, 50%)",
      };
    })
  );
  return newBrands;
}
//   brands.forEach(async (brand) => {
//     const rev = await getBrandRevenue(brand.name);
//     console.log("rev ", rev);
//     console.log("brand.name ", brand.name);
//     data.push({
//       id: brand.name,
//       label: brand.name,
//       value: rev,
//       color: "hsl(200, 50%, 50%)",
//     });
//   });
//   console.log("data ", data);
//   return data;
// }

async function createUserData() {
  const MAX_USERS = 20;
  const aYear = 31556926 * 1000;
  const aWeek = 604800 * 1000;
  let time = Date.now() - aYear;
  let data = [];
  let change1;
  let change2;
  let change3;
  for (let user_id = 10; user_id < MAX_USERS; user_id++) {
    change1 = 5 + Math.random() * 95;
    change2 = 5 + Math.random() * 95;
    change3 = 1 + Math.random() * 270;
    time = Date.now() - aYear;
    const userData = {
      id: user_id,
      color: `hsl(280, 50%, 50%)`,
      data: [],
    };
    const orders = await Order.findAll({ where: { user_id } });
    for (let week = 1; week <= 52; week++) {
      const moneySpent = getMoneySpent(orders, time);
      userData.data.push({ x: week, y: moneySpent });
      time += aWeek;
    }
    data.push(userData);
  }
  return data;
}

//? helpers
async function getBrandRevenue(brand) {
  let totalRevenue = 0;
  //console.log("ALL ORDER PRODUCTS ", allOrderProducts);
  const allOrderProducts = await OrderProduct.findAll();
  for (let i = 0; i < allOrderProducts.length; i++) {
    const product = await Product.findByPk(
      allOrderProducts[i].dataValues.product_id
    );
    if (product.dataValues.brand === brand) {
      //console.log("<--------------------------ENTRA");
      totalRevenue +=
        allOrderProducts[i].dataValues.price *
        allOrderProducts[i].dataValues.count;
      //console.log("TOTAL ", totalRevenue);
    }
  }
  return totalRevenue;
  // allOrderProducts.forEach(async (orderProduct) => {
  //   const product = await Product.findByPk(orderProduct.dataValues.product_id);
  //   //console.log("CONDITION ", product.dataValues.brand, " - ", brand);
  //   // console.log(
  //   //   "PRICE ",
  //   //   orderProduct.dataValues.price,
  //   //   " - ",
  //   //   "count ",
  //   //   orderProduct.dataValues.count
  //   // );
  //   if (product.dataValues.brand === brand) {
  //     //console.log("<--------------------------ENTRA");
  //     totalRevenue +=
  //       orderProduct.dataValues.price * orderProduct.dataValues.count;
  //     //console.log("TOTAL ", totalRevenue);
  //   }
  // });
  // console.log("tot ", totalRevenue);
  // return totalRevenue;
}
function getMoneySpent(orders, time) {
  let totalMoney = 0;
  for (let i = 0; i < orders.length; i++) {
    if (
      orders[i] !== null &&
      orders[i].relativeDateAdded < time &&
      orders[i].status === "completed"
    ) {
      totalMoney += orders[i].total;
      orders[i] = null;
    }
  }
  return totalMoney;
}

module.exports = { getAllStatistics };
