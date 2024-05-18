"use strict";
const { sequelize, DataTypes } = require("../system/core/db.connection");

const SubRegion = sequelize.define(
  "SubRegion",
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
    regionID: {
      type: DataTypes.BIGINT.UNSIGNED,
      required: true,
      index: true,
      references: {
        model: {
          tableName: "regions",
          modelName: "Region",
        },
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    modelName: "SubRegion",
    tableName: "sub_regions",
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

SubRegion.associate = function (models) {
  //SubRegion.hasMany(models.State, { foreignKey: "countryID", as: "states" });

  SubRegion.belongsTo(models.User, {
    as: "createdByUser",
    foreignKey: "createdBy",
  });
  SubRegion.belongsTo(models.User, {
    as: "updatedByUser",
    foreignKey: "updatedBy",
  });
};

module.exports = SubRegion;
