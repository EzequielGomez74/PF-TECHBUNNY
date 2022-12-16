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
        loadAllAssets().next();
        console.log("TERMINE");
      })
      .catch((err) => console.log(err));
  } else {
    try {
      await model.bulkCreate(array);
      console.log("1");
    } catch (error) {
      console.log(error);
    }
  }
}

function loadAllAssets() {
  loadtoDb(categories, Category, false);
  //console.log("2");
  yield null;
  const newArraySubcategories = subcategories.map(async (sub) => {
    const categoryInstance = await Category.findByPk(sub.category_id);
    console.log("A");
    return {
      name: sub.name,
      category: categoryInstance.name,
    };
  });
  console.log("3");
  loadtoDb(newArraySubcategories, SubCategory, true);
  //yield null;
  loadtoDb(brands, Brand, false);
  console.log("ARRANCA FOREACH");
  //yield null;
  products.forEach(async (product) => {
    Brand.findByPk(product.brand_id).then((res) => {
      const newObj = { brandName: res.name };
      //setTimeout(() => {}, 500);
      //console.log(product);
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
