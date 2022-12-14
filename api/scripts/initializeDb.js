// "esta va a cargar jsons a la data base"

const brands = require("../services/db/assets/brands.json");
const categories = require("../services/db/assets/categories.json");
const subcategories = require("../services/db/assets/subcategories.json");
const { Category, SubCategory } = require("../services/db/db.js")

async function loadtoDb(array, model) {
    try {
       await model.bulkCreate(array)
    } catch (error) {
        console.log(error)
    }
}

function loadAllAssets() {
    loadtoDb(categories, Category);
    loadtoDb(subcategories, SubCategory);
}