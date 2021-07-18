'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    phone_code: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
  }, {
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
    createdAt: 'created_at',
    updatedAt: 'updated_at'

  });

  Country.associate = function(models) {
    Country.hasMany(models.State, {foreignKey: 'country_id', as: 'states'});
  };

  return Country;
};
