const { Country } = require("../../services/db/db.js");

async function getAllCountries() {
  try {
    return await Country.findAll();
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getAllCountries };
