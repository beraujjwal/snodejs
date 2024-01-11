'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const Token = sequelize.define("Token",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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
      token: DataTypes.STRING,
      sentTo: DataTypes.STRING,
      sentOn: DataTypes.STRING,
      type: DataTypes.STRING,
      expireAt: DataTypes.DATE,
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'This column is for checking if the token is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'Token',
      tableName: 'tokens',
    }
);

Token.associate = function(models) {
  Token.belongsTo(models.User, {foreignKey: 'userID', as: 'user', constraints: true});
};

module.exports = Token;