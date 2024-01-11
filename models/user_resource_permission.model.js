'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const UserResourcePermission = sequelize.define("UserResourcePermission",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userID: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'User',
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
        comment: 'This column is for checking if the user resource permission is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'UserResourcePermission',
      tableName: 'user_resource_permissions',
      indexes: [{ unique: true, fields: [ 'userID', 'resourceID', 'permissionID'] }],
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

UserResourcePermission.associate = function(models) {
  UserResourcePermission.belongsTo(models.User, {foreignKey: 'userID'});
  UserResourcePermission.belongsTo(models.Resource, {foreignKey: 'resourceID'});
  UserResourcePermission.belongsTo(models.Permission, {foreignKey: 'permissionID'});

  UserResourcePermission.belongsTo(models.User, { as: 'addedBy', foreignKey: 'createdBy'});
  UserResourcePermission.belongsTo(models.User, {as: 'editedBy', foreignKey: 'updatedBy'});
};

module.exports = UserResourcePermission;