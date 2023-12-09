'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');

const Country = sequelize.define("Country",
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
      code: {
        type: DataTypes.STRING(2),
        required : true,
        index : true,
        unique: true
      },
      phoneCode: {
        type: DataTypes.INTEGER,
        required : true,
        index : true,
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
      modelName: 'Country',
      tableName: 'countries',
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

Country.associate = function(models) {
  Country.hasMany(models.State, {foreignKey: 'countryId', as: 'states'});
};

module.exports = Country;