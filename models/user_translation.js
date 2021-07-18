'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTranslation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserTranslation.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: DataTypes.INTEGER,
    lang: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'UserTranslation',
    tableName: 'user_translations',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });
  UserTranslation.associate = function(models) {
    UserTranslation.belongsTo(models.User, {as: 'translations', foreignKey: 'user_id'});
  };
  return UserTranslation;
};
