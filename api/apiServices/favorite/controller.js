const { Favorite, Product } = require("../../services/db/db.js");

async function getAllFavorite(user_id) {
  try {
    let favorites = await Favorite.findAll({ where: { user_id } });
    const result = [];
    for (let i = 0; i < favorites.length; i++) {
      const productData = await Product.findOne({
        where: { product_id: favorites[i].product_id },
      });
      const favorite = {
        ...favorites[i].dataValues,
        price: productData.dataValues.price,
        name: productData.dataValues.name,
        image: productData.dataValues.image,
        stock: productData.dataValues.stock,
        brand: productData.dataValues.brand,
      };
      result.push(favorite);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createFavorite(body) {
  try {
    const { product_id, user_id } = body;
    const existe = await Favorite.findOne({ where: { product_id, user_id } });
    if (!existe) {
      await Favorite.create({
        product_id,
        user_id,
      });

      return "Producto agregado a favoritos!";
    } else {
      await Favorite.destroy({ where: { product_id, user_id } });
      return "Producto eliminado a favoritos!";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createFavorite,
  getAllFavorite,
};
