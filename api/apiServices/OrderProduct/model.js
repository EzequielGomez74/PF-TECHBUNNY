const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "OrderProduct",
    {
      // orderProduct_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      count: {
        type: DataTypes.INTEGER,
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
