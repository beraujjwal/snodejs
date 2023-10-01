'use strict';
require('dotenv').config();

const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require('../system/core/db.connection');

const RolePermission = sequelize.define("RolePermission",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      permissionId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      permission: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'RolePermission',
      tableName: 'role_permissions',
      indexes: [{ unique: true, fields: [ 'permissionId', 'roleId'] }]
    }
);

RolePermission.associate = function(models) {
  RolePermission.belongsTo(models.Permission, {foreignKey: 'permissionId'});
  RolePermission.belongsTo(models.Role, {foreignKey: 'roleId'});
};

module.exports = RolePermission;