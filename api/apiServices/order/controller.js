const {
  Order,
  Product,
  OrderProduct,
  User,
} = require("../../services/db/db.js");
const { sendMail } = require("../../services/mailer/emailer.js");
const { response } = require("express");

// todo cuando se haga un post de cart, el mismo debe checkear si ya existe uno. Si es asi, se debe sumar al mismo.

                                                          //? DELETE ORDER

// $ esta funcion unicamente elimina productos del onCart de cada usuario.
async function deleteProductOrder(params, body){
  try {
    const cartUser = await Order.findAll({                                                                                              // $ esto busca el carrito en las ORDERS por el user_id
			where: { 
        user_id: params.user_id,
        status: "onCart"
       }
		}); 
    if (!cartUser[0].dataValues) { throw new Error("No se encontro un carrito asociado a este usuario")}
    await OrderProduct.destroy({
			where: {
				order_id: cartUser[0].dataValues.order_id,                                                                                      // $ elimina por la orden perteneciente al cartUser
				product_id: body.product_id,                                                                                                   // $ elimina el producto enviado por body
			},
		});
    console.log("El producto ", body.product_name, " fue eliminado del carrito")
  } catch (error) {
    throw new Error(error.message);
  }
}

                                                          //? UPDATE ORDER
// $ esta funcion actualiza el estado de las ordenes (
// $  status = "onCart" ===> status = "created"
// $  status = "created" ===> status = "processed"
// $  status = "processed" ===> status = "completed" || status = "canceled"
async function updateOrder(user_id, order_id, status ) {
  try {
    console.log(user_id, order_id, status )
    const order = await Order.update({status: status}, {where: {user_id: user_id, order_id: order_id}}); //
    console.log("se cambio el estado de la orden nro° ", order_id, " perteneciente al user ", user_id, "al estado: ", status)
    return order;
    } catch (error) {
    throw new Error(error.message);
  }
}


                                                          //? CREATE ORDER
// $ esta funcion siempre creara carritos
async function createOrder({ user_id, products }) {
  try {
    const user = await User.findByPk(user_id); //BUSCAMOS LOS DATOS DEL USER PARA EL EMAIL
    const newOrder = {  user_id };
    const order = await Order.create(newOrder); //
    let suma = 0;
    await products.forEach(async (product) => {                                                       // $ EMPIEZA A RECORRER EL ARRAY DE PRODUCTOS DE LA ORDER
      suma += product.count * product.price;                                                          // $ CALCULA EL TOTAL DE LA ORDER
      await order.addProduct(product.product_id, {
        through: {                                                                                     // $ CREA LOS DATOS DE LA TABLA INTERMEDIA
          product_name: product.product_name,
          count: product.count,
          price: product.price,
        },
      });
    });
    await Order.update(
      { total: suma },
      { where: { order_id: order.dataValues.order_id } }
    );
    const datos = await Order.findByPk(order.order_id);
    const userdata = await {
      ...user.dataValues,
      ...order.dataValues,
      ...datos.dataValues,
      type: "order",
    };
    // !    sendMail(userdata); 
    return order.order_id;
    } catch (error) {
    throw new Error(error.message);
  }
}


                                                          //? GET ORDERS
async function getOrders() {
  try {
    const getOrders = await Order.findAll();
    return getOrders;
  } catch (error) {
    throw new Error(error.message);
  }
}


                                                          //? GET ORDERS BY ID

async function getOrderById(order_id) {
  // BUSCA UNA ORDER POR ID
  try {
    const orde1 = await Order.findAll({
      where: { order_id },
      include: {
        model: Product,
        attributes: ["product_id"],
        through: {
          attributes: ["count"],
        },
      },
    });
    const orderById = orde1.map((el) => {
      //ordenamos los datos para mandarlos limpios al front
      return {
        ...el.dataValues,
        Products: el.Products.map((el) => {
          return { product_id: el.product_id, count: el.OrderProduct.count };
        }),
      };
    });
    return orderById;
  } catch (error) {
    throw new Error(error.message);
  }
}



                                                          //? GET ORDERS BY USER ID
async function getOrderByUserId(user_id) {
  // BUSCA TODAS LAS ORDENES DEL USUARIO
  try {
    const orde1 = await Order.findAll({
      where: { user_id },
      include: {
        model: Product,
        attributes: ["product_id"],
        through: {
          attributes: ["count"],
        },
      },
    });
    const clearResponse = orde1.map((el) => {
      //ordenamos los datos para mandarlos limpios al front
      return {
        ...el.dataValues,
        Products: el.dataValues.Products.map((ele) => {
          return {
            product_id: ele.dataValues.product_id,
            count: ele.dataValues.OrderProduct.count,
            // price: ele.OrderProduct.price
          };
        }),
      };
    });
    return clearResponse;
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  getOrders,
  getOrderByUserId,
  deleteProductOrder,
};
