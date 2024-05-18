"use strict";
const { sequelize, DataTypes } = require("../system/core/db.connection");
const User = require("./user.model");

const UserDevice = sequelize.define(
  "UserDevice",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    userID: {
      type: DataTypes.BIGINT.UNSIGNED,
      required: true,
      index: true,
      references: {
        model: {
          tableName: "users",
          modelName: "User",
        },
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    userToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    deviceId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    deviceType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    deviceFcmToken: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    deviceSalt: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    mac: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    os: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    browser: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: "UserDevice",
    tableName: "user_devices",
    //indexes: [{ unique: true, fields: ["userID", "roleID"] }],
    defaultScope: {},
  }
);

UserDevice.associate = function (models) {
  UserDevice.belongsTo(models.User, { foreignKey: "userID" });
};

module.exports = UserDevice;
