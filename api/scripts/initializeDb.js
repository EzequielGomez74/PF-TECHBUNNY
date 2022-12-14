// "esta va a cargar jsons a la data base"

const brands = require("../services/db/assets/brands.json");
const category = require("../services/db/assets/category.json");
const subcategory = require("../services/db/assets/subcategory.json");
const { Category, SubCategory } = require("../services/db/db.js")

async function loadtodb(array, model) {
    try {
       await model.bulkCreate(array)
    } catch (error) {
        console.log(error)
    }
}

function loadAllAssets() {
    loadtodb(category, Category);
    loadtodb(subcategory, SubCategory);
}