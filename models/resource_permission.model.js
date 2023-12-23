'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');

const ResourcePermission = sequelize.define("ResourcePermission",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      modelName: 'ResourcePermission',
      tableName: 'resource_permissions',
      indexes: [{ unique: true, fields: [ 'resourceId', 'permissionId'] }]
    }
);

ResourcePermission.associate = function(models) {
  ResourcePermission.belongsTo(models.Resource, { foreignKey: 'resourceId' });
  ResourcePermission.belongsTo(models.Permission, { foreignKey: 'permissionId' });
};

module.exports = ResourcePermission;