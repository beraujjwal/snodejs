'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require('../system/core/db.connection');

const VerificationToken = sequelize.define("VerificationToken",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
      type: DataTypes.STRING,
      expireAt: DataTypes.DATE,
      status: DataTypes.BOOLEAN
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'VerificationToken',
      tableName: 'verification_tokens',
    }
);

VerificationToken.associate = function(models) {
  VerificationToken.belongsTo(models.User, {foreignKey: 'userId', as: 'user', foreignKeyConstraint: true});
};

module.exports = VerificationToken;