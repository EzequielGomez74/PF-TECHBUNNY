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