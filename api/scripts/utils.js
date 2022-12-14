// "esta va a cargar jsons a la data base"

const brands = require("../services/db/assets/brands.json");
const category = require("../services/db/assets/category.json");
const subcategory = require("../services/db/assets/subcategory.json");
const { Category, SubCategory } = require("../services/db/db.js")

function loadtodb(array, model) {
    try {
        model.bulkCreate(array)
    } catch (error) {
        console.log(error)
    }
}

loadtodb(category, Category)
