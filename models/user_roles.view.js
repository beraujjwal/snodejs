"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRolesView extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRolesView.init(
    {
      id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "user_roles_view",
    }
  );
  return UserRolesView;
};
