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
  //console.log(array);
  let newArr = [];
  Promise.all(array)
    .then(async (res) => {
      res.forEach((response) => {
        //console.log(response.status, response.url);
        newArr.push(response);
        console.log("A", response);
      });
      return newArr;
    })
    .then(async (newA) => {
      await model.bulkCreate(newA);
    })
    .catch((err) => console.log(err));
}
async function loadtoDbA(array, model) {
  try {
    await model.bulkCreate(array);
  } catch (error) {
    console.log(error);
  }
}
async function loadAllAssets() {
  await loadtoDbA(categories, Category);
  const newArraySubcategories = subcategories.map(async (sub, i) => {
    //console.log(sub.name);
    const categoryInstance = await Category.findByPk(sub.category_id);
    //console.log(categoryInstance);
    //console.log(categoryInstance);
    //console.log(categoryInstance.dataValues.name);
    //console.log(categoryInstance.name);
    //if (i === subcategories.length - 1) console.log(newArraySubcategories);
    return {
      name: sub.name,
      category: categoryInstance.name,
    };
  });
  //console.log("ASD ", newArraySubcategories[0]);
  await loadtoDb(newArraySubcategories, SubCategory);
  // await loadtoDb(brands, Brand);
  // const newArrayProducts = products.map(async (product) => {
  //   const brandInstance = await Brand.findByPk(product.brand_id);
  //   const subcategoryInstance = await SubCategory.findByPk(
  //     product.subcategory_id
  //   );
  //   return {
  //     name: product.name,
  //     image: product.image,
  //     price: product.price,
  //     description: product.description,
  //     stock: product.stock,
  //     soldCount: product.soldCount,
  //     brand: brandInstance.name,
  //     subcategory: subcategoryInstance.name,
  //     category: subcategoryInstance.category,
  //   };
  // });
  // await loadtoDb(newArrayProducts, Product);
}

module.exports = loadAllAssets;
