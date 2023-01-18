const { SubCategory } = require("../../services/db/db.js");

async function getAllSubcategories() {
  try {
    const subcategories = await SubCategory.findAll();
    return subcategories;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getSubcategoryByCategory(category) {
  try {
    const subcategories = await SubCategory.findAll({
      where: { category: category },
    });
    return subcategories;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createSubcategory(subcategory) {
  try {
    await SubCategory.findOrCreate(
      {where:{name:subcategory.name},defaults:{category:subcategory.category}}
    );
    return "Subcategory creado con exito!";
  } catch (error) {
    throw new Error(error);
  }
}


async function deleteSubcategory(subcategoryId) {
  try {
    const existe = await SubCategory.findOne({ where: { subcategory_id:subcategoryId }});
    if (existe) {
      await SubCategory.update({isActive:false},{ where: { subcategory_id:subcategoryId } });
      return "Subcategory eliminada con exito!";
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getAllSubcategories, getSubcategoryByCategory, deleteSubcategory, createSubcategory };
