'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = ( sequelize ) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'userId'});
      this.belongsTo(models.Permission, {foreignKey: 'permissionId'});
    }
  };
  UserPermission.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER,
    permission: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
  }, {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: 'UserPermission',
    tableName: 'user_permissions',
  });

  return UserPermission;
};
