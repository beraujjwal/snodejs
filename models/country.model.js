"use strict";
const { sequelize, DataTypes } = require("../system/core/db.connection");
const User = require("./user.model");

const Country = sequelize.define(
  "Country",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      index: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(2),
      required: true,
      index: true,
      unique: true,
    },
    phoneCode: {
      type: DataTypes.INTEGER,
      required: true,
      index: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "This column is for checking if the country is active or not.",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: "Country",
    tableName: "countries",
    defaultScope: {
      attributes: {
        exclude: ["deletedAt", "deletedBy", "createdBy", "updatedBy"],
      },
      where: {
        status: true,
      },
      include: [
        {
          model: User,
          as: "createdByUser",
          attributes: ["id", "name", "phone", "email", "status"],
          required: false,
        },
        {
          model: User,
          as: "updatedByUser",
          attributes: ["id", "name", "phone", "email", "status"],
          required: false,
        },
      ],
    },
    scopes: {
      activeCountries: {
        where: {
          status: true,
        },
      },
    },
  }
);

Country.associate = function (models) {
  Country.hasMany(models.State, { foreignKey: "countryID", as: "states" });

  Country.belongsTo(models.User, {
    as: "createdByUser",
    foreignKey: "createdBy",
  });
  Country.belongsTo(models.User, {
    as: "updatedByUser",
    foreignKey: "updatedBy",
  });
};

module.exports = Country;
