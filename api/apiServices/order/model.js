const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Order",
    {
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
      {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
};
