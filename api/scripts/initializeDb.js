async function loadDb(array, model) {
  try {
    await model.bulkCreate(array);
  } catch (error) {}
}

function loadAllAssets() {
  loadDb(categories, Category);
  loadDb(products, Product);
  loadDb(users, User);
}
module.export = { loadAllAssets };
