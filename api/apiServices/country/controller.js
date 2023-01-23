const { Country } = require("../../services/db/db.js");

async function getAllCountries() {
  try {
    return await Country.findAll();
  } catch (error) {
    throw new Error(error);
  }
}

async function getCountriesById(id) {
  try {
    return await Country.findOne({where:{country_id:id}});
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getAllCountries,getCountriesById };
