const {
  Product,
  Category,
  SubCategory,
  Brand,
} = require("../../services/db/db.js");
const productDescriptionParser = require("../../scripts/productDescriptionParser.js");
const axios = require("axios");

async function getAllProducts() {
  try {
    const condition = {
      attributes: {
        exclude: ["description", "createdAt", "updatedAt"],
      },
    };
    const products = await Product.findAll(condition);
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

async function getProductById(productId) {
  try {
    const product = await Product.findByPk(productId);
    const newObj = { ...product };
    newObj.description = productDescriptionParser(product.description);
    return newObj;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getAllProducts, getProductById };
