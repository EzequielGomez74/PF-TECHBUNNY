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
    throw new Error(error);
  }
}

async function loadAllAssets() {
  try {
    await loadtoDb(categories, Category, false);
    const newArraySubcategories = await Promise.all(
      subcategories.map(async (sub) => {
        const categoryInstance = await Category.findByPk(sub.category_id);
        return {
          name: sub.name,
          category: categoryInstance.name,
        };
      })
    );
    await loadtoDb(newArraySubcategories, SubCategory);
    await loadtoDb(brands, Brand);
    //using promise y handled with async/await
    //using products.map instead of products.forEach
    const newArrayProducts = await Promise.all(
      products.map(async (product) => {
        const brand = await Brand.findByPk(product.brand_id);
        const subcategory = await SubCategory.findByPk(product.subcategory_id);
        return {
          name: product.name,
          image: product.image,
          price: product.price,
          description: product.description,
          stock: product.stock,
          soldCount: product.soldCount,
          brand: brand.name,
          subcategory: subcategory.name,
          category: subcategory.category,
        };
      })
    );
    await loadtoDb(newArrayProducts, Product);
    console.log("DATABSE LOADED SUCCESFULLY");
  } catch (error) {
    throw new Error("DATABASE INITIALIZATION FAILED");
  }
}

module.exports = loadAllAssets;
