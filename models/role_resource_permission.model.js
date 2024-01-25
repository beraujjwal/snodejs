'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const RoleResourcePermission = sequelize.define("RoleResourcePermission",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      roleID: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'Role',
          key: 'id',
        }
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
        comment: 'This column is for checking if the role resource permission is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'RoleResourcePermission',
      tableName: 'role_resource_permissions',
      indexes: [{ unique: true, fields: [ 'roleID', 'resourceID', 'permissionID'] }],
      defaultScope: {
        attributes: { exclude: [ 'deletedAt', 'deletedBy', 'createdBy','updatedBy' ] },
        where: {
          status: true,
        },
        include: [
          {
            model: User,
            as: 'createdByUser',
            attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
            required: false,
          },
          {
            model: User,
            as: 'updatedByUser',
            attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
            required: false,
          },
        ]
      },
    }
);

RoleResourcePermission.associate = function(models) {
  RoleResourcePermission.belongsTo(models.Role, { foreignKey: 'roleID' });
  RoleResourcePermission.belongsTo(models.Resource, { foreignKey: 'resourceID' });
  RoleResourcePermission.belongsTo(models.Permission, { foreignKey: 'permissionID' });

  RoleResourcePermission.belongsTo(models.User, { as: 'createdByUser', foreignKey: 'createdBy'});
  RoleResourcePermission.belongsTo(models.User, {as: 'updatedByUser', foreignKey: 'updatedBy'});
};

module.exports = RoleResourcePermission;