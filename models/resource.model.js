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
    parentID: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: {
          tableName: "resources",
          modelName: "Resource",
        },
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      validate: {
        isInt: true,
        notIn: [[1]],
      },
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
    footprints: true,
    sequelize,
    modelName: "Resource",
    tableName: "resources",
    //attributes: ["id", "name", "slug", "status", "createdAt"],
    defaultScope: {
      attributes: {
        exclude: ["deletedAt", "deletedBy", "createdBy", "updatedBy"],
      },
      where: {
        status: true,
      },
    },
  }
);

Resource.associate = function (models) {
  Resource.hasMany(Resource, {
    as: "childrens",
    foreignKey: "parentID",
    attributes: ["id", "name", "slug", "status"],
    required: false,
    auto: true,
  });

  Resource.belongsTo(Resource, {
    as: "parent",
    foreignKey: "parentID",
    attributes: ["id", "name", "slug", "status"],
    required: false,
    auto: true,
  });

  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.ResourcePermission,
      sourceKey: "permissionID",
      scope: {
        status: true,
      },
      attributes: [],
    },
    foreignKey: "resourceID",
    otherKey: "permissionID",
    as: "resourcePermissions",
    constraints: true,
    required: false,
    auto: false,
  });

  Resource.belongsToMany(models.Permission, {
    through: {
      model: models.RoleResourcePermission,
      sourceKey: "permissionID",
      scope: {
        status: true,
      },
      attributes: [],
    },
    foreignKey: "resourceID",
    otherKey: "permissionID",
    as: "resourceRolePermissions",
    constraints: true,
    required: false,
    auto: false,
  });

  Resource.belongsToMany(models.Role, {
    through: {
      model: models.RoleResourcePermission,
      sourceKey: "roleID",
      scope: {
        status: true,
      },
      attributes: [],
    },
    foreignKey: "resourceID",
    otherKey: "roleID",
    as: "resourcePermissionRoles",
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
      attributes: [],
    },
    foreignKey: "resourceID",
    otherKey: "permissionID",
    as: "resourceUserPermissions",
    constraints: true,
    required: false,
    auto: false,
  });

  Resource.belongsToMany(models.User, {
    through: {
      model: models.UserResourcePermission,
      sourceKey: "userID",
      scope: {
        status: true,
      },
      attributes: [],
    },
    foreignKey: "resourceID",
    otherKey: "userID",
    as: "resourcePermissionUsers",
    constraints: true,
    required: false,
    auto: false,
  });

  Resource.belongsToMany(models.Menu, {
    through: {
      model: models.MenuResource,
      scope: {
        status: true,
      },
      sourceKey: "menuID",
      attributes: [],
    },
    foreignKey: "resourceID",
    as: "resourceMenus",
    constraints: true,
    required: false,
    auto: true,
    attributes: ["id", "parentID", "name", "slug", "status"],
  });

  Resource.belongsTo(models.User, {
    as: "createdByUser",
    foreignKey: "createdBy",
    required: false,
    auto: true,
    attributes: ["id", "name", "phone", "email", "status"],
  });

  Resource.belongsTo(models.User, {
    as: "updatedByUser",
    foreignKey: "updatedBy",
    required: false,
    auto: true,
    attributes: ["id", "name", "phone", "email", "status"],
  });
};

module.exports = Resource;
