"use strict";
require("dotenv").config();

const { sequelize, DataTypes } = require("../system/core/db.connection");

const WorkLog = sequelize.define(
  "WorkLog",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    module: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    referenceId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: false,
    },
    deviceId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      required: true,
      index: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: "WorkLog",
    tableName: "worklogs",
  }
);

WorkLog.associate = function (models) {
  //WorkLog.belongsTo(models.User, { as: "createdBy", foreignKey: "userId" });
  //State.belongsTo(models.Country, { foreignKey: "countryID", as: "country" });
};

module.exports = WorkLog;
