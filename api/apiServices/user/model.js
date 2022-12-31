const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      user_id: {        
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
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
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        //1=guest 2=user 3=admin 
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 2,
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
        defaultvalue:
          "https://images.pagina12.com.ar/styles/focal_3_2_470x313/public/2022-10/663621-47230-hasbulla_0.png",
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
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
      }
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
      freezeTableName: true,
    }
  );
};
