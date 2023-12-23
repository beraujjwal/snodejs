'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');

const Resource = sequelize.define("Resource",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        required : true,
        index : true,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        required : true,
        index : true,
        allowNull: false,
        unique: true,
        validate: {
          isLowercase: true,
          async isUnique(value) {
            const resource = await sequelize.models.Resource.findOne({ where: { slug: value }});
            if (resource != null) {
              throw new Error('Resource name already used.');
            }
          }
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
      modelName: 'Resource',
      tableName: 'resources',
      defaultScope: {
        attributes: {
          exclude: [ 'createdAt','createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy' ]
        }
      },
    }
);

Resource.associate = function(models) {
  Resource.belongsToMany(models.Role, {through: 'RoleResourcePermission', foreignKey: 'resourceId', as: 'roles'});
  Resource.belongsToMany(models.Permission, {through: 'RoleResourcePermission', foreignKey: 'resourceId', as: 'resourcePermissions'});
  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.RoleResourcePermission,
      unique: false,
      scope: {
        status: true
      }
    },
    sourceKey: 'id',
    foreignKey: 'resourceId',
    as: 'roleResourcePermissions',
    constraints: false
  });

  Resource.belongsToMany(models.Permission, {through: 'UserResourcePermission', foreignKey: 'resourceId', as: 'permissions'});
  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.UserResourcePermission,
      unique: false,
      scope: {
        status: true
      }
    },
    sourceKey: 'id',
    foreignKey: 'resourceId',
    as: 'userResourcePermissions',
    constraints: false
  });
};

module.exports = Resource;