'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const State = sequelize.define("State",
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
      countryId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'State',
      tableName: 'states',
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

State.associate = function(models) {
  State.belongsTo(models.Country, {foreignKey: 'countryId', as: 'country'});
  State.hasMany(models.City, {foreignKey: 'stateId', as: 'cities'});
};

module.exports = State;