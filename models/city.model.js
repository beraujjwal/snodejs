'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const City = sequelize.define("City",
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
      stateId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'City',
      tableName: 'cities',
      /*defaultScope: {
        where: {
          deleted_at: null
        }
      },*/
      scopes: {
        activeCities: {
          where: {
            status: true
          }
        }
      },
    }
);

City.associate = function(models) {
  City.belongsTo(models.State, {foreignKey: 'stateId', as: 'state'});
};

module.exports = City;