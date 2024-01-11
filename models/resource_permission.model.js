'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const ResourcePermission = sequelize.define("ResourcePermission",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      resourceID: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'Resource',
          key: 'id',
        }
      },
      permissionID: {
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
        defaultValue: true,
        comment: 'This column is for checking if the resource permissions is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'ResourcePermission',
      tableName: 'resource_permissions',
      indexes: [{ unique: true, fields: [ 'resourceID', 'permissionID'] }],
      defaultScope: {
        attributes: { exclude: [ 'deletedAt', 'deletedBy', 'createdBy','updatedBy' ] },
        where: {
          status: true,
        },
        include: [
          {
            model: User,
            as: 'addedBy',
            attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
            required: false,
          },
          {
            model: User,
            as: 'editedBy',
            attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
            required: false,
          },
        ]
      },
    }
);

ResourcePermission.associate = function(models) {
  ResourcePermission.belongsTo(models.Resource, { foreignKey: 'resourceID' });
  ResourcePermission.belongsTo(models.Permission, { foreignKey: 'permissionID' });

  ResourcePermission.belongsTo(models.User, { as: 'addedBy', foreignKey: 'createdBy'});
  ResourcePermission.belongsTo(models.User, {as: 'editedBy', foreignKey: 'updatedBy'});
};

module.exports = ResourcePermission;