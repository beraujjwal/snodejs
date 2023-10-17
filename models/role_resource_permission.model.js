'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const RoleResourcePermission = sequelize.define("RoleResourcePermission",
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      roleId: DataTypes.INTEGER,
      resourceId: DataTypes.INTEGER,
      permissionId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'RoleResourcePermission',
      tableName: 'role_resource_permissions',
      indexes: [{ unique: true, fields: [ 'roleId', 'roleId'] }]
    }
);

RoleResourcePermission.associate = function(models) {
  RoleResourcePermission.belongsTo(models.Role, {foreignKey: 'roleId'});
  RoleResourcePermission.belongsTo(models.Resource, {foreignKey: 'resourceId'});
  RoleResourcePermission.belongsTo(models.Permission, {foreignKey: 'permissionId'});
};

module.exports = RoleResourcePermission;