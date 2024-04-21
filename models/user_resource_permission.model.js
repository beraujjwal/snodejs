"use strict";
const { sequelize, DataTypes } = require("../system/core/db.connection");
const User = require("./user.model");

const UserResourcePermission = sequelize.define(
  "UserResourcePermission",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userID: {
      type: DataTypes.BIGINT.UNSIGNED,
      required: true,
      index: true,
      references: {
        model: {
          tableName: "users",
          modelName: "User",
        },
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    resourceID: {
      type: DataTypes.BIGINT.UNSIGNED,
      required: true,
      index: true,
      references: {
        model: {
          tableName: "resources",
          modelName: "Resource",
        },
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    permissionID: {
      type: DataTypes.BIGINT.UNSIGNED,
      required: true,
      index: true,
      references: {
        model: {
          tableName: "permissions",
          modelName: "Permission",
        },
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment:
        "This column is for checking if the user resource permission is active or not.",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: "UserResourcePermission",
    tableName: "user_resource_permissions",
    indexes: [
      { unique: true, fields: ["userID", "resourceID", "permissionID"] },
    ],
    defaultScope: {
      attributes: {
        exclude: ["deletedAt", "deletedBy", "createdBy", "updatedBy"],
      },
      where: {
        status: true,
      },
      include: [
        {
          model: User,
          as: "createdByUser",
          attributes: ["id", "name", "phone", "email", "status"],
          required: false,
        },
        {
          model: User,
          as: "updatedByUser",
          attributes: ["id", "name", "phone", "email", "status"],
          required: false,
        },
      ],
    },
  }
);

UserResourcePermission.associate = function (models) {
  // UserResourcePermission.belongsTo(models.User, { foreignKey: "userID" });
  UserResourcePermission.belongsTo(models.Resource, {
    foreignKey: "resourceID",
  });
  UserResourcePermission.belongsTo(models.Permission, {
    foreignKey: "permissionID",
  });

  UserResourcePermission.belongsTo(models.User, {
    as: "createdByUser",
    foreignKey: "createdBy",
  });
  UserResourcePermission.belongsTo(models.User, {
    as: "updatedByUser",
    foreignKey: "updatedBy",
  });
};

module.exports = UserResourcePermission;
