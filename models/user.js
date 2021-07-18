'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, comment: 'This column is for checking if the user verify himself or not.' },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });
  User.associate = function(models) {
    User.belongsToMany(models.Role, { through: 'UserRole', foreignKey: 'user_id', as: 'roles' });
    User.belongsToMany(models.Permission, { through: 'UserPermission', foreignKey: 'user_id', as: 'permissions' });
    User.hasMany(models.UserTranslation, { as: 'translations', foreignKey: 'user_id', targetKey: 'id' });
    User.hasOne(models.UserTranslation, { as: 'translation', foreignKey: 'user_id', targetKey: 'id' });
    User.hasOne(models.VerificationToken, { as: 'verificationtoken', foreignKey: 'user_id', foreignKeyConstraint: true });

  };
  return User;
};
