"use strict";
const { sequelize, DataTypes } = require("../system/core/db.connection");
const User = require("./user.model");

const Token = sequelize.define(
  "Token",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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
      onDelete: "CASCADE",
    },
    token: DataTypes.STRING,
    sentTo: {
      type: DataTypes.ENUM("PHONE", "EMAIL"),
      required: true,
      defaultValue: "PHONE  ",
    },
    sentOn: DataTypes.STRING,
    sentFor: {
      type: DataTypes.ENUM("ACTIVATION", "RESET_PASSWORD", "FORGOT_PASSWORD"),
      required: true,
      defaultValue: "ACTIVATION",
    },
    expireAt: DataTypes.DATE,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "This column is for checking if the token is active or not.",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Token",
    tableName: "tokens",
  }
);

Token.associate = function (models) {
  Token.belongsTo(models.User, {
    foreignKey: "userID",
    as: "user",
    constraints: true,
  });
};

module.exports = Token;
