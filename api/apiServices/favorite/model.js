const { DataTypes } = require("sequelize");
      //! VERIFICAR SI ESTA BIEN ESTE MODELO O LE SOBRAN LAS SIGUIENTES COSAS : name , img , price , stock , brand
module.exports = (sequelize) => {
  sequelize.define(
    "Favorite",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
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