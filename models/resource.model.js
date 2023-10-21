'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const Resource = sequelize.define("Resource",
    {
      id: {
        type: DataTypes.INTEGER,
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
      status: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'Resource',
      tableName: 'resources',
    }
);

Resource.associate = function(models) {
  Resource.belongsToMany(models.Role, {through: 'RoleResourcePermission', foreignKey: 'resourceId', as: 'roles'});
  Resource.belongsToMany(models.Permission, {through: 'RoleResourcePermission', foreignKey: 'resourceId', as: 'permissions'});
  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.RoleResourcePermission,
      unique: true,
      scope: {
        // roleId: 1
      }
    },
    foreignKey: 'resourceId',
    as: 'roleResourcePermissions',
    constraints: false
  });
};

module.exports = Resource;
