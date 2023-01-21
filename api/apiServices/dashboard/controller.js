const { User, Product  , Order, Newsletter, Category } = require("../../services/db/db.js");
const emailer = require("../../services/mailer/emailer.js");


async function dashboardData() {
  try {

    // TODO - Aca va USERS

    let loggedUsers = 0;
    const totalUsers = await User.findAndCountAll()
    totalUsers.rows.map((el) => {  if (el.accessToken !== null) loggedUsers++ }) // cuenta usuarios activos
    

    console.log("usuarios logeados", loggedUsers)
    console.log("total de usuarios registrados", totalUsers.count)

    // TODO - Aca va ORDERS
let totalVolume = 0;
    proceso = await Order.sum("total", { where: { status: "completed" } });
    !proceso ? totalVolume=0 : totalVolume=proceso
    const soldProducs = await Product.sum('soldCount')
    const ordersData = await Order.findAll()

    console.log("cantidad de productos vendidos: ", soldProducs)
    console.log("cantidad de ordenes completadas", totalVolume)



    // TODO - Aca va PRODUCTSDATA
    const productsCount = await Product.count()
    const productsOutOfStock = await Product.count({ where: { stock: 0 }})
    const productsData = await Product.findAll()

    console.log("total de productos activos", productsCount)
    console.log("cantidad de productos sin stock", productsOutOfStock)


    // TODO - Aca va NEWSLETTER

    const subscriberCount = await Newsletter.count()
    let emails = [];
    const newsletterData = await Newsletter.findAll()
    newsletterData.map((el) => { emails.push(el.dataValues.email) })
    const activeOffers = await Category.count({where: {isOffer: true}})


    console.log("cantidad de ofertas activas", activeOffers)
    console.log("total de emails subscriptos", subscriberCount)
    console.log("estos son los emails subscritos al newsletter: ", emails)



    let dashboard = {
      usersData : {
        totalUsers:   totalUsers.count,
        loggedUsers: loggedUsers,
        // users: userData // reducir informacion // TODO : separar en subrutas para cada vista.  --- esta ya existe, es un GET a "/users"
      },
      ordersData : {
        salesVolume: totalVolume,
        soldProducs: soldProducs, 
        // orders: ordersData // TODO : separar en subrutas para cada vista. --- esta ya existe, es un GET a "/orders"
      },
      productsData : {
        productsCount: productsCount,
        productsOutOfStock: productsOutOfStock,
        // products: productsData // TODO : separar en subrutas para cada vista. --- esta ya existe, es un GET a "/products"
      },
      newsletterData : {
        subscriberCount : subscriberCount,
        // subscribers : emails, // TODO : separar en subrutas para cada vista. --- esta ya existe, es un GET a "/newsletters/"
        activeOffers: activeOffers,
      }
    }
    
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
  
    return dashboard
  } catch (error) {
    throw new Error(error);
  }
}




module.exports = {
  dashboardData,
};
