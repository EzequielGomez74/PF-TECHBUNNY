const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      user_id: {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        allowNull: true,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: true,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        allowNull: true,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        // 2=user 3=admin
        // 2=user 3=admin
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      needPasswordReset: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      profilePicture: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:
          "https://images.pagina12.com.ar/styles/focal_3_2_470x313/public/2022-10/663621-47230-hasbulla_0.png",
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      verificationData: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      verificationData: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      //IS LOGGED ?????
      isLogged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      googleAuth: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      secretAuth: {
        type: DataTypes.STRING,
        defaultValue: "2FADisabled",
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultvalue: false,
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
