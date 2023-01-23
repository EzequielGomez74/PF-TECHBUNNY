const { Cart, Product } = require("../../services/db/db.js");

async function getCart(user_id) {
  try {
    let carro = await Cart.findAll({ where: { user_id } });
    const result = [];
    for (let i = 0; i < carro.length; i++) {
      const productData = await Product.findOne({
        where: { product_id: carro[i].product_id },
      });
      const resu = {
        ...carro[i].dataValues,
        image: productData.dataValues.image,
        stock: productData.dataValues.stock,
        brand: productData.dataValues.brand,
      };
      result.push(resu);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

// $ esta ruta suma un producto al cart del usuario
async function addProduct(body, user_id) {
  try {
    const { product_id, price, count, product_name } = body;
    const existe = await Cart.findOne({ where: { product_id, user_id } });
    if (!existe) {
      await Cart.create({ user_id, product_id, price, count, product_name });
      return "Producto agregado a carrito!";
    } else {
      async function agregarProducto(
        product_id,
        price,
        count,
        product_name,
        user_id
      ) {
        await Cart.upsert(
          {
            user_id: user_id,
            product_id: product_id,
            price: price,
            product_name: product_name,
            count: count + existe.count,
          },
          { where: { product_id: existe.product_id } }
        );
      }
      agregarProducto(product_id, price, count, product_name, user_id);
      return "Productos de carrito actualizados!";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// $ esta funcion unicamente reduce o aumenta en 1 el producto del cart del usuario.
async function updateCount(user_id, body) {
  try {
    const { product_id, action } = body;
    const cartUser = await Cart.findOne({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });
    if (cartUser) {
      const verifyStock = await Product.findByPk(cartUser.product_id);
      if (action === "plus") {
        if (verifyStock.dataValues.stock === cartUser.count)
          throw new Error("no hay mas stock de este producto.");
        await cartUser.update(
          { count: cartUser.count + 1 },
          { where: { product_id: body.product_id } }
        );
      }
      if (action === "minus") {
        if (cartUser.count === 1)
          throw new Error("no se puede restar al producto si esta en 1.");
        await cartUser.update(
          { count: cartUser.count - 1 },
          { where: { product_id: body.product_id } }
        );
      }
    } else {
      throw new Error("no se encontró ese producto");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// ?                                                           DELETE CART

// $ esta funcion unicamente elimina productos o todo el cart del user_id.
async function deleteCart(params, product_id) {
  try {
    if (product_id) {
      await Cart.destroy({
        where: { product_id: product_id, user_id: params.user_id },
      });
      return "Se elimino el producto que solicitaste.";
    } else {
      await Cart.destroy({ where: { user_id: params.user_id } });
      return "Se elimino el carrito completo.";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  addProduct,
  getCart,
  updateCount,
  deleteCart,
};
