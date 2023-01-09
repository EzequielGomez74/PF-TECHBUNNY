
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

module.exports = { getAllSubcategories, getSubcategoryByCategory };
