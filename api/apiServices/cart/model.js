const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      product_name: {                       // NOMBRE DEL PRODUCTO 
        type: DataTypes.STRING,
        allowNull: false,
      },
      count: {                              // UNIDADES DE CADA PRODUCTO 
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {                              // PRECIO DEL PRODUCTO
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
};
