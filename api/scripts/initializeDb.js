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
				loadAllAssets();
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

async function loadAllAssets() {
	await loadtoDb(categories, Category, false);
	await loadtoDb(brands, Brand, false);
  console.log("2");
	const newArraySubcategories = subcategories.map(async (sub) => {
		const categoryInstance = await Category.findByPk(sub.category_id);
    console.log("entra al subcategories");
		return {
			name: sub.name,
			category: categoryInstance.name,
		};
	});
	const subs = await loadtoDb(newArraySubcategories, SubCategory, true);
  console.log("3");
	products.forEach(async (product) => {
    console.log("ARRANCA FOREACH");
     Brand.findByPk(product.brand_id).then(async (res) => {
      const newObj = { brandName: res.name };
      //setTimeout(() => {}, 500);
      //console.log(product);
      const eso = await SubCategory.findByPk(product.subcategory_id).then(async (resp) => {
        console.log("vuelve al foreach");
        const name = await resp.name;
        const category = await resp.category;
        const obj = {
          name: product.name,
          image: product.image,
          price: product.price,
          description: product.description,
          stock: product.stock,
          soldCount: product.soldCount,
          brand: newObj.brandName,
          subcategory: name,
          category: category,
        };
        const crear = await Product.create(obj);
      });
    });
  });

}

module.exports = loadAllAssets;
