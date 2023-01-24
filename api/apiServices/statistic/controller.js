const {
  Op,
  User,
  Order,
  Brand,
  OrderProduct,
  Product,
  Category,
} = require("../../services/db/db.js");

async function getAllStatistics() {
  const allStatisticsData = {};
  allStatisticsData.usersData = await createUserData();
  allStatisticsData.brandsData = await createBrandsData();
  allStatisticsData.categoriesData = await createCategoriesData();
  return allStatisticsData;
}

async function createCategoriesData() {
  const aYear = 31556926 * 1000;
  const aMonth = 2629743 * 1000;
  let time;
  const categories = await Category.findAll();
  const mappedProducts = await getProductsArray();
  const orders = await Order.findAll();
  /*{
    order: [["order_id", "ASC"]],
  }*/
  const months = [
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
    "ENE",
  ];
  const data = [];
  for (let catIndex = 0; catIndex < categories.length; catIndex++) {
    time = Date.now() - aYear;
    const categoryName = categories[catIndex].dataValues.name;
    const categoryData = {
      id: categoryName,
      data: [],
    };
    for (let month = 0; month < months.length; month++) {
      let monthlyTotalProducts = await getMonthlyProducts(
        orders,
        categoryName,
        time,
        mappedProducts
      );
      categoryData.data.push({ x: months[month], y: monthlyTotalProducts });
      time += aMonth;
    }
    data.push(categoryData);
  }
  return data;
}

//! fast
async function getMonthlyProducts(orders, categoryName, time, products) {
  try {
    let results = [];
    for (let i = 0; i < orders.length; i++) {
      if (
        orders[i].dataValues.relativeDateAdded < time &&
        orders[i].dataValues.status === "completed"
      ) {
        const orderProducts = await OrderProduct.findAll({
          raw: true,
          where: { order_id: orders[i].dataValues.order_id },
        });
        results = [...results, ...orderProducts];
      }
    }
    const allProducts = await Promise.all(
      results.map(async (orderProduct) => {
        if (products[orderProduct.product_id].category === categoryName)
          return products[orderProduct.product_id].price * orderProduct.count;
        else return 0;
      })
    );
    let total = 0;
    for (let i = 0; i < allProducts.length; i++) {
      total += allProducts[i];
    }
    return total;
  } catch (error) {
    throw new Error(error);
  }
}

async function createBrandsData() {
  const data = [];
  const brands = await Brand.findAll();
  const newBrands = await Promise.all(
    brands.map(async (brand) => {
      const revenue = await getBrandRevenue(brand.name);
      return {
        id: brand.name,
        label: brand.name,
        value: revenue,
        color: "hsl(200, 50%, 50%)",
      };
    })
  );
  return newBrands;
}

async function createUserData() {
  const MAX_USERS = 20;
  const aYear = 31556926 * 1000;
  const aWeek = 604800 * 1000;
  let time;
  let data = [];
  for (let user_id = 10; user_id < MAX_USERS; user_id++) {
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
  const allOrderProducts = await OrderProduct.findAll();
  for (let i = 0; i < allOrderProducts.length; i++) {
    const product = await Product.findByPk(
      allOrderProducts[i].dataValues.product_id
    );
    if (product.dataValues.brand === brand) {
      totalRevenue +=
        allOrderProducts[i].dataValues.price *
        allOrderProducts[i].dataValues.count;
    }
  }
  return totalRevenue;
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

async function getProductsArray() {
  const results = [];
  const products = await Product.findAll();
  results.push({
    product_id: products[0].dataValues.product_id,
    price: products[0].dataValues.price,
    category: products[0].dataValues.category,
  });
  for (let i = 0; i < products.length; i++) {
    results.push({
      product_id: products[i].dataValues.product_id,
      price: products[i].dataValues.price,
      category: products[i].dataValues.category,
    });
  }
  return results;
}
module.exports = { getAllStatistics };
