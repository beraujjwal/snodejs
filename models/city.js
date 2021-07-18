'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    state_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
  }, {
    scopes: {
      activeCities: {
        where: {
          status: true
        }
      }
    },
    sequelize,
    modelName: 'City',
    tableName: 'cities',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  City.associate = function(models) {
    City.belongsTo(models.State, {foreignKey: 'state_id', as: 'state'});
  };

  return City;
};
