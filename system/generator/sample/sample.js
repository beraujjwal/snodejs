'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MODEL_SINGULAR_FORM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MODEL_SINGULAR_FORM.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'MODEL_SINGULAR_FORM',
    tableName: 'MODEL_PLURAL_FORM',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });
  MODEL_SINGULAR_FORM.associate = function(models) {

  };
  return MODEL_SINGULAR_FORM;
};
