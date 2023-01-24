require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
//const { DB_USER, DB_PASSWORD, DB_HOST } = require("../../config/default.js");

/*
 */
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(
        `postgresql://postgres:6ArW2auywnfkkjN35Bgh@containers-us-west-31.railway.app:6923/railway`, //eso es lo que da railway en connect Postgres Connection URL
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      )
    : new Sequelize(
        `postgres:${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      );

// const sequelize = new Sequelize(
//   `postgres:${DB_USER}:${DB_PASSWORD}@${DB_HOST}/techbunny_db`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );
//Error: ENOENT: no such file or directory, scandir '/app/services/db/apiServices'
const basename = path.basename(__filename);
const modelDefiners = [];
//const dbPath = __dirname.split("\\services\\db")[0];
const dbPath = path.join(__dirname, "..", "..");
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(dbPath, "apiServices")).forEach((file) => {
  if (fs.existsSync(path.join(dbPath, "apiServices", file, "model.js")))
    modelDefiners.push(
      require(path.join(dbPath, "apiServices", file, "model.js"))
    );
});
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

//--------------
//DESTRUCTURING DE MODEL Y CREACION DE RELACIONES
const {
  Brand,
  Category,
  Country,
  Order,
  Product,
  Review,
  Newsletter,
  SubCategory,
  User,
  OrderProduct,
  Favorite,
  Cart,
} = sequelize.models;

// ----> CATEGORY & SUBCATEGORIES

Product.hasMany(Review, { foreignKey: "product_id" });
Review.belongsTo(Product, { foreignKey: "product_id" });

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "order_id",
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "product_id",
});

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Country.hasMany(User, { foreignKey: "country_id" });
User.belongsTo(Country, { foreignKey: "country_id" });

User.belongsToMany(Product, {
  through: Favorite,
  foreignKey: "user_id",
});
Product.belongsToMany(User, {
  through: Favorite,
  foreignKey: "product_id",
});

User.belongsToMany(Product, {
  through: Cart,
  foreignKey: "user_id",
});
Product.belongsToMany(User, {
  through: Cart,
  foreignKey: "product_id",
});

module.exports = {
  //...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  db: sequelize,
  Category,
  SubCategory,
  Product,
  Brand,
  User,
  Review,
  Newsletter,
  Country,
  Order,
  OrderProduct,
  Favorite,
  Cart,
  Op, // para importart la conexión { conn } = require('./db.js');
};
