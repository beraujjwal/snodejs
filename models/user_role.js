'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserRole.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  UserRole.associate = function(models) {
    UserRole.belongsTo(models.User, {foreignKey: 'user_id'})
    UserRole.belongsTo(models.Role, {foreignKey: 'role_id'})
  };
  return UserRole;
};
