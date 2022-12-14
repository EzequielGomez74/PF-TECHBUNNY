const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
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
