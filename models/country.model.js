'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const Country = sequelize.define("Country",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        required : true,
        index : true,
        allowNull: false
      },
      code: DataTypes.STRING,
      phoneCode: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'Country',
      tableName: 'countries',
      /*defaultScope: {
        where: {
          deleted_at: null
        }
      },*/
      scopes: {
        activeCountries: {
          where: {
            status: true
          }
        }
      },

    }
);

Country.associate = function(models) {
  Country.hasMany(models.State, {foreignKey: 'countryId', as: 'states'});
};

module.exports = Country;