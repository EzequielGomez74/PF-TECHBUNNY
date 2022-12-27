const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "SubCategory",
    {
      subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        //allowNull: false,
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
