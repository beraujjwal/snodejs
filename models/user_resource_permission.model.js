'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const UserResourcePermission = sequelize.define("UserResourcePermission",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: DataTypes.INTEGER,
      resourceId: DataTypes.INTEGER,
      permissionId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'UserResourcePermission',
      tableName: 'user_resource_permissions',
      indexes: [{ unique: true, fields: [ 'userId', 'roleId'] }]
    }
);

UserResourcePermission.associate = function(models) {
  UserResourcePermission.belongsTo(models.User, {foreignKey: 'userId'});
  UserResourcePermission.belongsTo(models.Resource, {foreignKey: 'resourceId'});
  UserResourcePermission.belongsTo(models.Permission, {foreignKey: 'permissionId'});
};

module.exports = UserResourcePermission;