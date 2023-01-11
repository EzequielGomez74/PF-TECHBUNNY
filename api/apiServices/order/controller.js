const { Order, Product, User } = require("../../services/db/db.js");
const { sendMail } = require("../../services/mailer/emailer.js");

async function createOrder({ status, user_id, products }) {
  try {
    const user = await User.findByPk(user_id); //BUSCAMOS LOS DATOS DEL USER PARA EL EMAIL
    const newOrder = { status, user_id };
    const order = await Order.create(newOrder);
    let suma = 0;
    await products.forEach(async (product) => {
      const productoDb = await Product.findByPk(product.product_id); // ACA TRAEMOS LOS PRODUCTOS CON SU PRICE
      await order.addProduct(product.product_id, {
        // CREA LOS DATOS DE LA TABLA INTERMEDIA
        through: {
          product_name: productoDb.name,
          count: product.count,
          price: productoDb.dataValues.price,
        },
      });
      suma += product.count * productoDb.dataValues.price; // CALCULA EL TOTAL DE LA ORDER
      await Order.update(
        { total: suma },
        { where: { order_id: order.dataValues.order_id } }
      );
    });
    const object = { ...order, type: "order" }; //ENVIO DE EMAIL
    //sendMail(user.email, object); //ENVIO DE EMAIL
    return order.order_id;
  } catch (error) {
    throw new Error(error.message);
  }
}

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

async function updateOrder(order, data) {
  try {
    await Order.update({ status: data.status }, { where: { order_id: order } });
    return "Orden modificada con exito!";
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
};
