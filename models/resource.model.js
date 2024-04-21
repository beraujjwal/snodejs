"use strict";
const { sequelize, DataTypes } = require("../system/core/db.connection");
const User = require("./user.model");

const Resource = sequelize.define(
  "Resource",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      index: true,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      required: true,
      index: true,
      allowNull: false,
      unique: true,
      validate: {
        isLowercase: true,
        async isUnique(value) {
          const resource = await sequelize.models.Resource.findOne({
            where: { slug: value },
          });
          if (resource != null) {
            throw new Error("Resource name already used.");
          }
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "This column is for checking if the resource is active or not.",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: "Resource",
    tableName: "resources",
    defaultScope: {
      attributes: {
        exclude: ["deletedAt", "deletedBy", "createdBy", "updatedBy"],
      },
      where: {
        status: true,
      },
      // include: [
      //   {
      //     model: User,
      //     as: "createdByUser",
      //     attributes: ["id", "name", "phone", "email", "status"],
      //     required: false,
      //   },
      //   {
      //     model: User,
      //     as: "updatedByUser",
      //     attributes: ["id", "name", "phone", "email", "status"],
      //     required: false,
      //   },
      // ],
    },
  }
);

Resource.associate = function (models) {
  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.RoleResourcePermission,
      //unique: false,
      sourceKey: "permissionID",
      scope: {
        status: true,
      },
    },
    targetKey: "permissionID",
    foreignKey: "resourceID",
    as: "roleResourcePermissions",
    constraints: true,
    required: false,
    auto: false,
  });
  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.ResourcePermission,
      //unique: false,
      sourceKey: "permissionID",
      scope: {
        status: true,
      },
    },
    targetKey: "permissionID",
    foreignKey: "resourceID",
    as: "resourcePermissions",
    constraints: true,
    required: false,
    auto: false,
  });
  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.UserResourcePermission,
      sourceKey: "permissionID",
      scope: {
        status: true,
      },
    },
    targetKey: "permissionID",
    foreignKey: "resourceID",
    //otherKey: "permissionID",
    as: "userResourcePermissions",
    constraints: true,
    required: false,
    auto: false,
  });
  Resource.belongsToMany(models.Menu, {
    through: {
      model: models.MenuResource,
      unique: false,
      scope: {
        status: true,
      },
      sourceKey: "menuID",
      attributes: ["id"],
    },
    targetKey: "menuID",
    foreignKey: "resourceID",
    as: "resourceMenus",
    constraints: true,
    required: false,
    auto: true,
  });
  Resource.belongsTo(models.User, {
    as: "createdByUser",
    foreignKey: "createdBy",
    required: false,
    auto: true,
  });
  Resource.belongsTo(models.User, {
    as: "updatedByUser",
    foreignKey: "updatedBy",
    required: false,
    auto: true,
  });
};

module.exports = Resource;
