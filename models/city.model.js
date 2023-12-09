'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');

const City = sequelize.define("City",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        required : true,
        index : true,
        allowNull: false
      },
      stateId: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'State',
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
      modelName: 'City',
      tableName: 'cities',
      defaultScope: {
        where: {
          deleted_at: null
        }
      },
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