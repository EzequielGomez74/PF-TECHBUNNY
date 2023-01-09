const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "OrderProduct",
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
      freezeTableName: true,
    }
  );
};
