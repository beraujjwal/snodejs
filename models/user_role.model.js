'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const UserRole = sequelize.define("UserRole",
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      userId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'UserRole',
      tableName: 'user_roles',
      indexes: [{ unique: true, fields: [ 'userId', 'roleId'] }]
    }
);

UserRole.associate = function(models) {
  UserRole.belongsTo(models.User, {foreignKey: 'userId'});
  UserRole.belongsTo(models.Role, {foreignKey: 'roleId'});
};

module.exports = UserRole;