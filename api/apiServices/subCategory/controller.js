<<<<<<< HEAD
const {
    Product,
    Category,
    SubCategory,
    Brand,
  } = require("../../services/db/db.js");


  async function allSubc() {
    try {
      const subcategorys = await SubCategory.findAll();
      console.log(subcategorys)
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function filtroSubc(subcQuery) {
    try {
      const filtro = await SubCategory.findAll(subcQuery).filter(d => d.SubCategory.toLowerCase()==subcQuery.toLowerCase());
      filtro.length ? res.status(200).send(filtro) : res.status(404).send("Subcategory not found"); ;
      console.log(filtro)
    } catch (error) {
      throw new Error(error);
    }
  }
  
  module.exports = { filtroSubc, allSubc };
=======
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
>>>>>>> 66b7519adfc6f3782986a71883b225b8e9ec575c
