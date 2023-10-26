'use strict';
const { DataTypes } = require('sequelize');
const moment = require('moment');
const bcrypt = require("bcryptjs");

const sequelize = require('../system/core/db.connection');
const Role = require('./role.model');
const Permission = require('./permission.model');
const Resource = require('./resource.model');
const saltRounds = 9;

const User = sequelize.define("User",
  {
    id: {
      type: DataTypes.BIGINT(11),
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
      allowNull: true,
      defaultValue: null,
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
    indexes: [ { unique: true, fields: [ 'name', 'phone', 'email'] } ],
    defaultScope: {
      attributes: { exclude: [ 'password', 'tokenSalt', 'createdAt', 'updatedAt', 'deletedAt' ] },
      where: {
        status: true,
      }
    },
    scopes: {
      withRoles: {
        attributes: { exclude: ['password'] },
        // include: [
        //   { model: SecretClub, as: 'secretClub' },
        //   { model: Item, as: 'items' }
        // ]
      }
    },
    instanceMethods: {
      async generateHash(password) {
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hashSync(user.password, salt);
      },
      async validPassword(password) {
          return bcrypt.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(saltRounds);
          user.password = bcrypt.hashSync(user.password, salt);
        }
       },
       beforeUpdate:async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(saltRounds);
          user.password = bcrypt.hashSync(user.password, salt);
        }
       }
    }
  }
);

// User.prototype.validPassword = async (password, hash) => {
//   return await bcrypt.compareSync(password, hash);
// }

User.associate = function(models) {
  User.belongsToMany(models.Role, { through: 'UserRole', scope: { status: true }, foreignKey: 'userId', as: 'activeRoles' });
  User.belongsToMany(models.Role, { through: 'UserRole', foreignKey: 'userId', as: 'roles' });

  User.belongsToMany(models.Resource, { through: 'UserResourcePermission', foreignKey: 'userId', as: 'resources' });
  User.belongsToMany(models.Permission, { through: 'UserResourcePermission', foreignKey: 'userId', as: 'permissions' });
  User.hasMany(models.Token, { as: 'tokens', foreignKey: 'userId', foreignKeyConstraint: true });
};



module.exports = User;