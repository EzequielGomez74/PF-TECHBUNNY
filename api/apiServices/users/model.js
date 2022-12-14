const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      name: {
        type: DataTypes.STRING,
        allownull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
        allownull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allownull: false,
      },
      season: {
        type: DataTypes.ENUM("Summer", "Autumn", "Spring", "Winter"),
        allownull: false,
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
