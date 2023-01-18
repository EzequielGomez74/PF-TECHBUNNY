//!                    ESTA RUTA DE TIPO GET RETORNA UN OBJETO COMO EL SIGUIENTE : 
//! dashboard = {
//!  usersData : {
//!     totalUsers:   totalUsers.count,
//      totalUsers : Numero   que hace referencia a la cantidad de usuarios registrados en la pagina (activos y inactivos)
//!    loggedUsers: loggedUsers,
//     loggedUsers : Numero   que hace referencia a la cantidad de usuarios que actualmente tienen un accestoken . por lo que se supone que estan logeados. 
//!     users: userData // reducir informacion
//      users : Es un array de objetos [{..},{..},{..}....{..}], cada objeto corresponde a un usuarios {
                                                                            //   user_id : u.user_id,
                                                                            //   username : u.username,
                                                                            //   name : u.name,
                                                                            //   surname : u.surname,
                                                                            //   email : u.email,
                                                                            //   billingAddress : u.billingAddress,
                                                                            //   zipCode : u.zipCode,
                                                                            //   role : u.role,
                                                                            //   isActive : u.isActive,
                                                                            //   createdAt : u.createdAt,
                                                                            // }
//!   },
//!   ordersData : {
//!     salesVolume: totalVolume,
//      salesVolume : Numero   que hace referencia al total de $ generado con los productos de ordenes completas.
//!     soldProducts: soldProducs,
//      soldProducts:  Numero  que hace referencia a cantidad de productos vendidos .
//!     orders: ordersData
//      orders : Es un Array  de objetos [{..},{..},{..}....{..}] que en cada objeto contiene los datos de una orden.
//!   },
//!   productsData : {
//!     productsCount: productsCount,
//      productsCount :  Numero que hace referencia a la cantidad de productos (activos y inactivos) de la bd.
//!     productsOutOfStock: productsOutOfStock,
//      productsOutOfStock : Numero que hace referencia a la cantidad de productos con stock = 0 en la bd. 
//!     products: productsData
//      products : Es un Array  de objetos [{..},{..},{..}....{..}] que en cada objeto contiene un producto de la bd .
//!   },
//!   newsletterData : {
//!     subscriberCount : subscriberCount,
//      subscriberCount :  Numero que hace referencia a la cantidad de gente suscripta al newsletter
//!     subscribers : newsletterData,
//      subscribers : es un array [] que contiene el mail de cada uno de los suscriptores .
//!   }
//! }

const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.dashboardData());
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;