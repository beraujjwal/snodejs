"use strict";
const { sequelize, DataTypes } = require("../system/core/db.connection");

const MenuResource = sequelize.define(
  "MenuResource",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    menuID: {
      type: DataTypes.BIGINT.UNSIGNED,
      required: true,
      index: true,
      references: {
        model: {
          tableName: "menus",
          modelName: "Menu",
        },
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
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
      onDelete: "RESTRICT",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment:
        "This column is for checking if the resource permissions is active or not.",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: "MenuResource",
    tableName: "menu_resources",
    indexes: [{ unique: true, fields: ["resourceID", "menuID"] }],
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

MenuResource.associate = function (models) {
  MenuResource.belongsTo(models.Resource, { foreignKey: "resourceID" });
  MenuResource.belongsTo(models.Menu, { foreignKey: "menuID" });
  MenuResource.belongsTo(models.User, {
    as: "createdByUser",
    foreignKey: "createdBy",
  });
  MenuResource.belongsTo(models.User, {
    as: "updatedByUser",
    foreignKey: "updatedBy",
  });
};

module.exports = MenuResource;
