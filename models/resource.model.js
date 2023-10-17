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
  // Resource.belongsToMany(models.Role, {through: 'UserResource', foreignKey: 'resourceId', as: 'users'});
  // Resource.belongsToMany(models.Permission, {through: 'ResourcePermission', foreignKey: 'resourceId', as: 'permissions'});
};

module.exports = Resource;
