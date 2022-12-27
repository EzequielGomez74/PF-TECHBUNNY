// "esta va a cargar jsons a la data base"

const brands = require("../services/db/assets/brands.json");
const categories = require("../services/db/assets/categories.json");
const subcategories = require("../services/db/assets/subcategories.json");
const products = require("../services/db/assets/products.json");
const countries = require("../services/db/assets/countries.json");
const reviews = require("../services/db/assets/reviews.json");
const users = require("../services/db/assets/users.json");
const {
  Category,
  SubCategory,
  Product,
  Brand,
  Country,
  Review,
  User,
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
    await loadtoDb(countries, Country);
    await loadtoDb(categories, Category);
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
    console.log('Acá')
    await loadtoDb(brands, Brand);
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
    await loadtoDb(users, User);
    await loadtoDb(reviews, Review);
    await loadMockAsset(reviews, Review);
    console.log("DATABASE LOADED SUCCESFULLY");
  } catch (error) {
    throw new Error(error.message);
  }
}

async function loadMockAsset(array, model) {
  const review = await Review.findByPk(1);

  await Review.update(
    { user_id: 1, product_id: 2 },
    { where: { review_id: 1 } }
  );

  // review.set({ user_id: 1, product_id: 2 });
  // await review.save();
}
module.exports = loadAllAssets;
