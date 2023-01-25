const {
  Order,
  OrderProduct,
  Product,
  User,
  Cart,
} = require("../../services/db/db.js");
const { sendMail } = require("../../services/mailer/emailer.js");
const controller = require("./controller.js");
const moment = require("moment");

// todo cuando se haga un post de cart, el mismo debe checkear si ya existe uno. Si es asi, se debe sumar al mismo.

//? UPDATE ORDER
// $ esta funcion actualiza el estado de las ordenes (
// $  status = "created" ===> status = "processed"
// $  status = "processed" ===> status = "completed" || status = "canceled"
async function updateOrder(order_id, status) {
  try {
    const order = await Order.update(
      { status: status },
      { where: { order_id: order_id } }
    );

    const productos = await OrderProduct.findAll({
      where: { order_id },
      raw: true,
    });
    if (status === "canceled") {
      productos.map(async (p) => {
        const actual = await Product.findOne({
          where: { product_id: p.product_id },
        });
        await Product.update(
          { stock: actual.stock + p.count },
          { where: { product_id: p.product_id } }
        );
      });
    }
    if (status === "completed") {
      productos.map(async (p) => {
        const actual = await Product.findOne({
          where: { product_id: p.product_id },
          raw: true,
        });
        await Product.update(
          { soldCount: actual.soldCount + p.count },
          { where: { product_id: p.product_id } }
        );
      });
      // sendMail(userdata); //! su pago fue recibido
    }
    console.log("sale");
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateOrderData(order_id, body) {
  try {
    const dataUser = {
      user_id: body.user_id,
      name: body.name,
      surname: body.surname,
      email: body.email,
      shippingAddress: body.shippingAddress,
      zipCode: body.zipCode,
      city: body.city,
      preference_id: body.preference_id,
    };
    const order = await Order.update(dataUser, {
      where: { user_id: body.user_id, order_id: order_id },
    }); //
    // if (order.dataValues.status !== "onCart")
    // {
    // sendMail(userdata);
    // }
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}

// $ esta funcion siempre creara carritos
async function createOrder(user_id) {
  try {
    const userCart = await Cart.findAll({ where: { user_id } });
    const user = await User.findByPk(user_id); //BUSCAMOS LOS DATOS DEL USER PARA EL EMAIL
    const newOrder = { user_id };
    let order = await Order.create(newOrder); //
    let suma = 0;
    await userCart.forEach(async (product) => {
      // $ EMPIEZA A RECORRER EL ARRAY DE PRODUCTOS DE LA ORDER

      suma += product.count * product.price; // $ CALCULA EL TOTAL DE LA ORDER
      await order.addProduct(product.product_id, {
        through: {
          // $ CREA LOS DATOS DE LA TABLA INTERMEDIA
          product_name: product.product_name,
          count: product.count,
          price: product.price,
        },
      });
      const actual = await Product.findByPk(product.product_id); //$ ACTUALIZA EL STOCK DEL PRODUCTO    (line 49-50)
      await Product.update(
        { stock: actual.dataValues.stock - product.dataValues.count },
        { where: { product_id: product.product_id } }
      );
    });
    await Order.update(
      { total: suma },
      { where: { order_id: order.dataValues.order_id } }
    );
    order = await Order.findOne({
      where: { order_id: order.dataValues.order_id },
    });
    const datos = await Order.findByPk(order.order_id); //Informacion que necesita para el mail
    const productos = await OrderProduct.findAll({
      where: { order_id: order.dataValues.order_id },
    });
    const userdata = {
      ...order.dataValues,
      ...datos.dataValues,
      ...user.dataValues,
      productos: productos,
      type: "order",
    };
    sendMail(userdata); // Envia el mail
    await Cart.destroy({ where: { user_id: user_id } }); // Elimina el carrito ya se transformo en una orden
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
async function getOrdersByUserId(user_id) {
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
          };
        }),
      };
    });
    return clearResponse;
  } catch (error) {
    throw new Error(error.message);
  }
}
//$ Checkea el status de la order , si esta processed por mas de 24 horas se cancela
async function checkOrderStatus() {
  try {
    const foundOrders = await Order.findAll({ where: { status: "processed" } });
    if (foundOrders) {
      foundOrders.forEach((order) => {
        let timestamp = moment(order.createdAt).unix();
        if (Date.now() / 1000 - timestamp > 240) {
          updateOrder(order.order_id, "canceled");
        }
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

//!! ------------------------------------------
//!! COPIA DE CREATE ORDER PARA ORDER GENERATOR
// $ esta funcion siempre creara carritos
async function createRelativeOrder(user_id, relativeDateAdded) {
  try {
    const userCart = await Cart.findAll({ where: { user_id } });
    const user = await User.findByPk(user_id); //BUSCAMOS LOS DATOS DEL USER PARA EL EMAIL
    const newOrder = { user_id };
    const order = await Order.create(newOrder); //
    let suma = 0;
    await userCart.forEach(async (product) => {
      // $ EMPIEZA A RECORRER EL ARRAY DE PRODUCTOS DE LA ORDER

      suma += product.count * product.price; // $ CALCULA EL TOTAL DE LA ORDER
      await order.addProduct(product.product_id, {
        through: {
          // $ CREA LOS DATOS DE LA TABLA INTERMEDIA
          product_name: product.product_name,
          count: product.count,
          price: product.price,
        },
      });
      const actual = await Product.findByPk(product.product_id); //$ ACTUALIZA EL STOCK DEL PRODUCTO    (line 49-50)
      await Product.update(
        { stock: actual.dataValues.stock - product.dataValues.count },
        { where: { product_id: product.product_id } }
      );
    });
    await Order.update(
      { total: suma, relativeDateAdded },
      { where: { order_id: order.dataValues.order_id } }
    );
    const datos = await Order.findByPk(order.order_id); //Informacion que necesita para el mail
    const userdata = {
      ...user.dataValues,
      ...order.dataValues,
      ...datos.dataValues,
      type: "order",
    };
    // sendMail(userdata);                                                        // Envia el mail
    await Cart.destroy({ where: { user_id: user_id } }); // Elimina el carrito ya se transformo en una orden
    return order.order_id;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  getOrders,
  getOrdersByUserId,
  updateOrderData,
  checkOrderStatus,
  createRelativeOrder,
};
