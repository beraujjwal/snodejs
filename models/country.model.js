'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = ( sequelize ) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.State, {foreignKey: 'countryId', as: 'states'});
    }
  };

  Country.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    phoneCode: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
  }, {
    timestamps: true,
    paranoid: true,
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
    sequelize,
    modelName: 'Country',
    tableName: 'countries',

  });

  return Country;
};
