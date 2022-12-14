const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      review_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: " "
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewDate: {
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
