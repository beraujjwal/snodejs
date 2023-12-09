'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');

const Token = sequelize.define("Token",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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
      token: DataTypes.STRING,
      sentTo: DataTypes.STRING,
      sentOn: DataTypes.STRING,
      type: DataTypes.STRING,
      expireAt: DataTypes.DATE,
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
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