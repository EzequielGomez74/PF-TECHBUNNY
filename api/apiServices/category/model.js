const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      cantDescuento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isOffer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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