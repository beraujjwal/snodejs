"use strict";
const { sequelize, DataTypes } = require("../system/core/db.connection");

const Timezone = sequelize.define(
  "Timezone",
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
    iso3: {
      type: DataTypes.STRING(3),
      required: true,
      index: true,
      unique: true,
    },
    iso2: {
      type: DataTypes.STRING(2),
      required: true,
      index: true,
      unique: true,
    },
    numericCode: {
      type: DataTypes.STRING(5),
      required: true,
      index: true,
    },
    phoneCode: {
      type: DataTypes.STRING(5),
      required: true,
      index: true,
    },
    capital: {
      type: DataTypes.STRING,
      required: true,
    },
    currency: {
      type: DataTypes.STRING(3),
      required: true,
    },
    currencyName: {
      type: DataTypes.STRING(50),
      required: true,
    },
    currencySymbol: {
      type: DataTypes.STRING(10),
      required: true,
    },
    tld: {
      type: DataTypes.STRING(10),
      required: true,
    },
    native: {
      type: DataTypes.STRING,
      required: true,
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
    subRegionID: {
      type: DataTypes.BIGINT.UNSIGNED,
      required: true,
      index: true,
      references: {
        model: {
          tableName: "subregions",
          modelName: "SubRegion",
        },
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    nationality: {
      type: DataTypes.STRING(50),
      required: true,
    },
    timezones: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue("timezones"));
      },
      set: function (value) {
        return this.setDataValue("timezones", JSON.stringify(value));
      },
      required: false,
    },
    latitude: {
      type: DataTypes.STRING(20),
      required: true,
    },
    longitude: {
      type: DataTypes.STRING(20),
      required: true,
    },
    emoji: {
      type: DataTypes.STRING(10),
      required: true,
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
    modelName: "Timezone",
    tableName: "timezones",
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

Timezone.associate = function (models) {
  //Timezone.hasMany(models.State, { foreignKey: "countryID", as: "states" });

  Timezone.belongsTo(models.User, {
    as: "createdByUser",
    foreignKey: "createdBy",
  });
  Timezone.belongsTo(models.User, {
    as: "updatedByUser",
    foreignKey: "updatedBy",
  });
};

module.exports = Timezone;
