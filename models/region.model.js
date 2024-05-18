"use strict";
const { sequelize, DataTypes } = require("../system/core/db.connection");

const Region = sequelize.define(
  "Region",
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
    footprints: true,
    sequelize,
    modelName: "Region",
    tableName: "regions",
    defaultScope: {
      attributes: {
        exclude: ["deletedAt", "deletedBy", "createdBy", "updatedBy"],
      },
      where: {
        status: true,
      },
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

Region.associate = function (models) {
  //Region.hasMany(models.State, { foreignKey: "countryID", as: "states" });

  Region.belongsTo(models.User, {
    as: "createdByUser",
    foreignKey: "createdBy",
  });
  Region.belongsTo(models.User, {
    as: "updatedByUser",
    foreignKey: "updatedBy",
  });
};

module.exports = Region;
