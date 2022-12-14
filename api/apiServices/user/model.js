const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      billingAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      defaultShippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(["admin","user"]),
        allowNull: true,
        defaultValue: "user",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultvalue: false,
      },
      needPasswordReset: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultvalue: false,
      },
      profilePicture: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultvalue: "https://images.pagina12.com.ar/styles/focal_3_2_470x313/public/2022-10/663621-47230-hasbulla_0.png",
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
