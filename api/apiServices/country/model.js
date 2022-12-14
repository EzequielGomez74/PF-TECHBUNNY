const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Country",
    {
      country_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag: { 
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "https://flagcdn.com/w320/ar.png",
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
