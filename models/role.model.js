'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require('../system/core/db.connection');

const Role = sequelize.define("Role",
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
            var role = await sequelize.models.Role.findOne({ where: { slug: value }});
            if (role != null) {
              throw new Error('Role name already used.');
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
      modelName: 'Role',
      tableName: 'roles',
    }
);

Role.associate = function(models) {
  this.belongsToMany(models.User, {through: 'UserRole', foreignKey: 'roleId', as: 'users'});
  this.belongsToMany(models.Permission, {through: 'RolePermission', foreignKey: 'roleId', as: 'permissions'});
};

module.exports = Role;
