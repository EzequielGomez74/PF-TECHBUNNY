const {
  User,
  Product,
  Order,
  Newsletter,
  Category,
} = require("../../services/db/db.js");
const emailer = require("../../services/mailer/emailer.js");

async function dashboardData() {
  try {
    // TODO - Aca va USERS

    let loggedUsers = 0;
    const totalUsers = await User.findAndCountAll();
    totalUsers.rows.map((el) => {
      if (el.accessToken !== null) loggedUsers++;
    }); // cuenta usuarios activos
    const userData = totalUsers.rows.map((u) => {
      let obj = {
        user_id: u.user_id,
        username: u.username,
        name: u.name,
        surname: u.surname,
        email: u.email,
        billingAddress: u.billingAddress,
        zipCode: u.zipCode,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt,
      };

      if (u.accessToken) {
        obj = {
          ...obj,
          isLogged: true,
        };
      }
      return obj;
    });

    // TODO - Aca va ORDERS
    let totalVolume = 0;
    proceso = await Order.sum("total", { where: { status: "completed" } });
    !proceso ? (totalVolume = 0) : (totalVolume = proceso);
    const soldProducs = await Product.sum("soldCount");
    const ordersData = await Order.findAll();

    // TODO - Aca va PRODUCTSDATA
    const productsCount = await Product.count();
    const productsOutOfStock = await Product.count({ where: { stock: 0 } });
    const productsData = await Product.findAll();

    // TODO - Aca va NEWSLETTER

    const subscriberCount = await Newsletter.count();
    let emails = [];
    const newsletterData = await Newsletter.findAll();
    newsletterData.map((el) => {
      emails.push(el.dataValues.email);
    });
    const activeOffers = await Category.count({ where: { isOffer: true } });

    let dashboard = {
      usersData: {
        totalUsers: totalUsers.count,
        loggedUsers: loggedUsers,
        users: userData, // reducir informacion
      },
      ordersData: {
        salesVolume: totalVolume,
        soldProducs: soldProducs,
        orders: ordersData,
      },
      productsData: {
        productsCount: productsCount,
        productsOutOfStock: productsOutOfStock,
        products: productsData,
      },
      newsletterData: {
        subscriberCount: subscriberCount,
        subscribers: emails,
        activeOffers: activeOffers,
      },
    };

    // ordersdata:{
    // soldproducts:
    // sales volume:
    // orders[...]
    // }

    // productsdata{
    // productscount: 830.
    // productOutOfStock :
    // products[...]
    // }

    // newsletterdata{
    // suscriberscount:
    // offersactive:
    // suscribers[...]
    // }

    return dashboard;
  } catch (error) {
    throw new Error(error);
  }
}

async function getProducts() {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  dashboardData,
  getProducts,
};
