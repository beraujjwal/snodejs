'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');

const RoleResourcePermission = sequelize.define("RoleResourcePermission",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      roleId: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'Role',
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
      modelName: 'RoleResourcePermission',
      tableName: 'role_resource_permissions',
      indexes: [{ unique: true, fields: [ 'roleId', 'resourceId', 'permissionId'] }]
    }
);

RoleResourcePermission.associate = function(models) {
  RoleResourcePermission.belongsTo(models.Role, { foreignKey: 'roleId' });
  RoleResourcePermission.belongsTo(models.Resource, { foreignKey: 'resourceId' });
  RoleResourcePermission.belongsTo(models.Permission, { foreignKey: 'permissionId' });
};

module.exports = RoleResourcePermission;