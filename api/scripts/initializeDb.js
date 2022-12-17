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

async function loadtoDb(array, model, mode) {
  if (mode) {
    let newArr = [];
    Promise.all(array)
      .then(async (res) => {
        res.forEach((response) => {
          newArr.push(response);
        });
        await model.bulkCreate(newArr);
      })
      .catch((err) => console.log(err));
  } else {
    try {
      await model.bulkCreate(array);
    } catch (error) {
      console.log(error);
    }
  }
}

async function loadAllAssets() {
  await loadtoDb(categories, Category, false);
  const newArraySubcategories = await new Promise((resolve, reject) => {
    const aux = subcategories.map(async (sub) => {
      try {
        const categoryInstance = await Category.findByPk(sub.category_id);
        return {
          name: sub.name,
          category: categoryInstance.name,
        };
      } catch (error) {
        reject(error);
      }
    });
    resolve(aux);
  });
  await loadtoDb(newArraySubcategories, SubCategory, true);
  await loadtoDb(brands, Brand, false);
  products.forEach(async (product) => {
    Brand.findByPk(product.brand_id).then((res) => {
      const newObj = { brandName: res.name };
      SubCategory.findByPk(product.subcategory_id).then(async (resp) => {
        newObj.name = resp.name;
        newObj.category = resp.category;
        const obj = {
          name: product.name,
          image: product.image,
          price: product.price,
          description: product.description,
          stock: product.stock,
          soldCount: product.soldCount,
          brand: newObj.brandName,
          subcategory: newObj.name,
          category: newObj.category,
        };
        await Product.create(obj);
      });
    });
  });
}

module.exports = loadAllAssets;
