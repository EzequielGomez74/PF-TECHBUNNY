const { Brand } = require("../../services/db/db.js");

const getAllBrands = async () => {
  try {
    const brands = await Brand.findAll();
    return brands;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getAllBrands };
