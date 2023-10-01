'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../system/core/db.connection');

module.exports = () => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.State, {foreignKey: 'stateId', as: 'state'});
    }


  };

  City.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    stateId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
  }, {
    timestamps: true,
    paranoid: true,
    scopes: {
      activeCities: {
        where: {
          status: true
        }
      }
    },
    sequelize,
    modelName: 'City',
    tableName: 'cities'
  });

  return City;
};
