'use strict';
require('dotenv').config();
const moment = require('moment');

const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require('../system/core/db.connection');

const User = sequelize.define("User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isPhoneVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tokenSalt: {
        type: DataTypes.STRING,
        allowNull: true
      },
      loginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
          isBelowZero(value) {
            if (value < 0) {
              throw new Error('Can not be below zero!');
            }
          }
        }
      },
      blockExpires: {
        type: DataTypes.DATE,
        defaultValue: moment().utc(process.env.APP_TIMEZONE).toDate(),  //defaultValue: DataTypes.NOW
      },
      deviceId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      deviceType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fcmToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'This column is for checking if the user verify himself or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'User',
      tableName: 'users',
      indexes: [{ unique: true, fields: [ 'name', 'phone', 'email'] }]
    }
);

User.associate = function(models) {
  User.belongsToMany(models.Role, { through: 'UserRole', foreignKey: 'userId', as: 'roles' });
  User.belongsToMany(models.Permission, { through: 'UserPermission', foreignKey: 'userId', as: 'permissions' });
  User.hasOne(models.VerificationToken, { as: 'verificationtoken', foreignKey: 'userId', foreignKeyConstraint: true });
};

module.exports = User;