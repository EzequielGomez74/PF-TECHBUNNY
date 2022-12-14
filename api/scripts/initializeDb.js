// "esta va a cargar jsons a la data base"

const brands = require("../services/db/assets/brands.json");
const categories = require("../services/db/assets/categories.json");
const subcategories = require("../services/db/assets/subcategories.json");
const products = require("../services/db/assets/products.json");
const {
  Category,
  SubCategory,
  Product,
  Brand,
} = require("../services/db/db.js");

async function loadtoDb(array, model) {
  try {
    await model.bulkCreate(array);
  } catch (error) {
    console.log(error);
  }
}

async function loadAllAssets() {
  console.log(categories);
  await loadtoDb(categories, Category);
  await loadtoDb(subcategories, SubCategory);
  await loadtoDb(brands, Brand);
  await loadtoDb(products, Product);
}

module.exports = loadAllAssets;
