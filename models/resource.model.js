'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

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
        defaultValue: true,
        comment: 'This column is for checking if the resource is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'Resource',
      tableName: 'resources',
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

Resource.associate = function(models) {


  //Resource.belongsToMany(models.Role, {through: 'RoleResourcePermission', foreignKey: 'resourceID', as: 'roles'});
  //Resource.belongsToMany(models.Permission, {through: 'RoleResourcePermission', foreignKey: 'resourceID', as: 'resourcePermissions'});


  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.RoleResourcePermission,
      //unique: false,
      scope: {
        status: true
      }
    },
    //otherKey: 'permissionID',
    foreignKey: 'resourceID',
    as: 'roleResourcePermissions',
    constraints: true
  });

  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.UserResourcePermission,
      //unique: false,
      scope: {
        status: true
      }
    },
    //targetKey: 'id',
    foreignKey: 'resourceID',
    as: 'permissions',
    constraints: true
  });

  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.UserResourcePermission,
      unique: false,
      scope: {
        status: true
      }
    },
    //targetKey: 'id',
    foreignKey: 'resourceID',
    as: 'userResourcePermissions',
    constraints: true
  });

  Resource.belongsTo(models.User, { as: 'createdByUser', foreignKey: 'createdBy'});
  Resource.belongsTo(models.User, { as: 'updatedByUser', foreignKey: 'updatedBy'});
};

module.exports = Resource;