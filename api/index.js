const server = require("./src/app.js");
const { db } = require("./src/db.js");

// Syncing all the models at once.
db.sync({ force: true }).then(async () => {
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
