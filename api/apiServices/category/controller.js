const { Category } = require("../../services/db/db.js");

async function getAllCategories() {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getAllCategories };
