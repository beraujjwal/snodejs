'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');

const UserRole = sequelize.define("UserRole",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'User',
          key: 'id',
        }
      },
      roleId: {
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
        defaultValue: true
      },
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