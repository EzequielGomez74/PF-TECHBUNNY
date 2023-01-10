const { Category } = require("../../services/db/db.js");

async function getAllCategories() {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createCategory(category) {
  try {
    await Category.findOrCreate(
      {where:{name: category.name}}
    );
    return "Category creada con exito!";
  } catch (error) {
    throw new Error(error);
  }
}


async function deleteCategory(categoryId) {
  try {
    const existe = await Category.findOne({ where: { category_id:categoryId }});
    if (existe) {
      await Category.update({isActive:false},{ where: { category_id:categoryId } });
      return "Category eliminada con exito!";
    }
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = { getAllCategories , deleteCategory, createCategory};
