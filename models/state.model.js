'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = ( sequelize ) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Country, {foreignKey: 'countryId', as: 'country'});
      this.hasMany(models.City, {foreignKey: 'stateId', as: 'cities'});
    }
  };

  State.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
  }, {
    timestamps: true,
    paranoid: true,
    defaultScope: {
      where: {
        deleted_at: null
      }
    },
    scopes: {
      activeStates: {
        where: {
          status: true
        }
      }
    },
    sequelize,
    modelName: 'State',
    tableName: 'states'
  });

  return State;
};
