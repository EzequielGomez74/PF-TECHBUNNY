const { User, Product  , Order, Newsletter } = require("../../services/db/db.js");
const emailer = require("../../services/mailer/emailer.js");


async function dashboardData() {
  try {

    // TODO - Aca va USERS

    let loggedUsers = 0;
    const totalUsers = await User.findAndCountAll()
    totalUsers.rows.map((el) => {  if (el.accessToken !== null) loggedUsers++ }) // cuenta usuarios activos
    const userData = totalUsers.rows.map((u) => {
      let obj = {
        user_id : u.user_id,
        username : u.username,
        name : u.name,
        surname : u.surname,
        email : u.email,
        billingAddress : u.billingAddress,
        zipCode : u.zipCode,
        role : u.role,
        isActive : u.isActive,
        createdAt : u.createdAt,
      }

      if(u.accessToken){
        obj = {
          ...obj
          ,isLogged : true};
      }
      return obj
    }) 

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
    const newsletterData = await Newsletter.findAll()

    console.log("total de emails subscriptos", subscriberCount)
    console.log("estos son los emails subscritos al newsletter: ", newsletterData)




    let dashboard = {
      usersData : {
        totalUsers:   totalUsers.count,
        loggedUsers: loggedUsers,
        users: userData // reducir informacion
      },
      ordersData : {
        salesVolume: totalVolume,
        soldProducs: soldProducs,
        orders: ordersData
      },
      productsData : {
        productsCount: productsCount,
        productsOutOfStock: productsOutOfStock,
        products: productsData
      },
      newsletterData : {
        subscriberCount : subscriberCount,
        subscribers : newsletterData,
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
