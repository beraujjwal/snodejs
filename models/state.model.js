'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');

const State = sequelize.define("State",
    {
      id: {
        type: DataTypes.BIGINT,
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
      countryId: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'Country',
          key: 'id',
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'State',
      tableName: 'states',
      defaultScope: {
        where: {
          deleted_at: null
        }
      },
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