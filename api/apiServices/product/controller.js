const { Product, SubCategory, Brand } = require('../../services/db/db.js');
const axios = require('axios')


async function getAllProducts() {
    try {
        console.log("mandando products");
        const condition = { include: [{model: SubCategory, attributes: ["name"]}, {model: Brand, attributes: ["name"]}],attributes: { exclude: ['description',"brand_id","subcategory_id","createdAt","updatedAt"]}};
        const products = await Product.findAll(condition);
        console.log("ya mandé los products master");
        return products;
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = { getAllProducts }