'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const UserRole = sequelize.define("UserRole",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
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
      roleID: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'Role',
          key: 'id',
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'This column is for checking if the user role is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'UserRole',
      tableName: 'user_roles',
      indexes: [{ unique: true, fields: [ 'userID', 'roleID'] }],
      defaultScope: {
        attributes: { exclude: [ 'deletedAt', 'deletedBy', 'createdBy','updatedBy' ] },
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

UserRole.associate = function(models) {
  UserRole.belongsTo(models.User, {foreignKey: "userID"});
  UserRole.belongsTo(models.Role, {foreignKey: "roleID"});

  UserRole.belongsTo(models.User, { as: 'addedBy', foreignKey: 'createdBy'});
  UserRole.belongsTo(models.User, {as: 'editedBy', foreignKey: 'updatedBy'});
};

module.exports = UserRole;