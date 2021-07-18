'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    country_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
  }, {
    /*defaultScope: {
      where: {
        deleted_at: null
      }
    },*/
    scopes: {
      activeStates: {
        where: {
          status: true
        }
      }
    },
    sequelize,
    modelName: 'State',
    tableName: 'states',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  State.associate = function(models) {
    State.belongsTo(models.Country, {foreignKey: 'country_id', as: 'country'})
    State.hasMany(models.City, {foreignKey: 'state_id', as: 'cities'});
  };

  return State;
};
