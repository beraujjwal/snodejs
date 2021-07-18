'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RolePermission.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    permission_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    permission: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'role_permissions',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  RolePermission.associate = function(models) {
    RolePermission.belongsTo(models.Permission, {foreignKey: 'permission_id'})
    RolePermission.belongsTo(models.Role, {foreignKey: 'role_id'})
  };
  return RolePermission;
};
