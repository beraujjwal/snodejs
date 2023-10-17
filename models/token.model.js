'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const Token = sequelize.define("Token",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
      sentTo: DataTypes.STRING,
      sentOn: DataTypes.STRING,
      type: DataTypes.STRING,
      expireAt: DataTypes.DATE,
      status: DataTypes.BOOLEAN
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
  Token.belongsTo(models.User, {foreignKey: 'userId', as: 'user', foreignKeyConstraint: true});
};

module.exports = Token;