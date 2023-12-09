'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');

const UserResourcePermission = sequelize.define("UserResourcePermission",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'User',
          key: 'id',
        }
      },
      resourceId: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'Resource',
          key: 'id',
        }
      },
      permissionId: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'Permission',
          key: 'id',
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'UserResourcePermission',
      tableName: 'user_resource_permissions',
      indexes: [{ unique: true, fields: [ 'userId', 'resourceId', 'permissionId'] }]
    }
);

UserResourcePermission.associate = function(models) {
  UserResourcePermission.belongsTo(models.User, {foreignKey: 'userId'});
  UserResourcePermission.belongsTo(models.Resource, {foreignKey: 'resourceId'});
  UserResourcePermission.belongsTo(models.Permission, {foreignKey: 'permissionId'});
};

module.exports = UserResourcePermission;