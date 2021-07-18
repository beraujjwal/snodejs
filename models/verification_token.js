'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerificationToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  VerificationToken.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    type: DataTypes.STRING,
    expire_at: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'VerificationToken',
    tableName: 'verification_tokens',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  VerificationToken.associate = function(models) {
    VerificationToken.belongsTo(models.User, {foreignKey: 'user_id', as: 'user', foreignKeyConstraint: true});

  };
  return VerificationToken;
};
