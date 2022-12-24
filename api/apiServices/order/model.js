const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Order",
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.ENUM(["created", "processed", "complete", "canceled"]),
        allowNull: false,
        defaultValue: "created",
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
