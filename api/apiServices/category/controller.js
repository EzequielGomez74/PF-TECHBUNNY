const { Category } = require("../../services/db/db.js");

async function getAllCategories() {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOffers() {
  try {
    const ofertas = Category.findAll({ where: { isOffer: true } });
    return ofertas;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createOffer(offer) {
  try {
    await Category.update(
      { isOffer: true, cantDescuento: offer.cantDescuento },
      { where: { category_id: offer.category_id } }
    );
    return "Oferta creada con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteOffer(category_id) {
  try {
    await Category.update(
      { isOffer: false, cantDescuento: 0 },
      { where: { category_id: category_id } }
    );
    return "Oferta eliminada con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

async function createCategory(category) {
  try {
    await Category.findOrCreate({ where: { name: category.name } });
    return "Category creada con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteCategory(categoryId) {
  try {
    const existe = await Category.findOne({
      where: { category_id: categoryId },
    });
    if (existe) {
      await Category.update(
        { isActive: false },
        { where: { category_id: categoryId } }
      );
      return "Category eliminada con exito!";
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getAllCategories,
  deleteCategory,
  createCategory,
  getAllOffers,
  deleteOffer,
  createOffer,
};
