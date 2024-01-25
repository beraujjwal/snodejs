'use strict';
require('dotenv').config();
const moment = require('moment');
const bcrypt = require("bcryptjs");

const { sequelize, DataTypes } = require('../system/core/db.connection');
const saltRounds = parseInt(process.env.SALT_FACTOR);

const User = sequelize.define("User",
  {
    id: {
      type: DataTypes.BIGINT,
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
      allowNull: true,
      validate: {
        notEmpty: true,
        isEmail: true,
        isLowercase: true
      }
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/i
      }
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
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'This column is for checking if the user verify himself or not.'
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'This column is for checking if the user is active or not.'
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
      attributes: { exclude: [ 'password', 'tokenSalt', 'createdAt','createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy' ] },
      // include: [
      //   {
      //     model: self,
      //     as: 'createdByUser',
      //     attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
      //     required: false,
      //   },
      //   {
      //     model: this,
      //     as: 'updatedByUser',
      //     attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
      //     required: false,
      //   },
      // ]
    },
    scopes: {
      // withRoles: {
      //   attributes: { exclude: ['password'] },
      //   include: [
      //     { model: Role, as: 'roles' },
      //   ]
      // }
    },
    instanceMethods: {
      async generateHash(password) {
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hashSync(password, salt);
      },
      async validPassword(password) {
          return bcrypt.compareSync(password, this.password);
      },
      async update(values, options) {
        return super.update(values, { ...options, individualHooks: true });
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
  //User.belongsToMany(models.Role, { through: "UserRole", scope: { status: true }, foreignKey: "userID", as: "activeRoles" });
  User.belongsToMany(models.Role,
    {
      through: {
      model: models.UserRole,
      unique: true,
      scope: {
        status: true
      }
    },
    foreignKey: "userID",
    as: "roles",
    constraints: true
  });
  User.belongsToMany(models.Resource, { through: 'UserResourcePermission', foreignKey: 'userID', as: 'resources' });
  User.hasMany(models.Token, { as: 'tokens', foreignKey: 'userID', foreignKeyConstraint: true, sourceKey: 'id' });

  User.hasMany(User, { as: 'children', foreignKey: 'createdBy', sourceKey: 'id'});
  User.belongsTo(User, { as: 'addedBy', foreignKey: 'createdBy', sourceKey: 'id'});

  // User.hasMany(User, {as: 'children', foreignKey: 'updatedBy', sourceKey: 'id'});
  User.belongsTo(User, {as: 'updatedByUser', foreignKey: 'updatedBy', sourceKey: 'id'});

};



module.exports = User;