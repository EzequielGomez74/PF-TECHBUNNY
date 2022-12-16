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
      // include: [
      //   { model: SubCategory, attributes: ["name"] },
      //   { model: Brand, attributes: ["name"] },
      // ],
      attributes: {
        exclude: [
          "description",
          //"brand_id",
          //"subcategory_id",
          "createdAt",
          "updatedAt",
        ],
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
    const condition = {
      where: { product_id: productId },
      include: [
        { all: true, nested: true },
        // {
        //   model: SubCategory,
        //   attributes: ["name"],
        //   nested: true,
        // },
        // { model: Brand, attributes: ["name"] },
        // //{ model: Category },
      ],
    };
    const product = await Product.findByPk(productId, condition);
    return product;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getAllProducts, getProductById };
