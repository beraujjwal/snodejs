"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_resource_permissions",
      {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userID: {
          type: Sequelize.BIGINT.UNSIGNED,
          references: {
            model: {
              tableName: "users",
              modelName: "User",
            },
            key: "id",
          },
          allowNull: false,
          onUpdate: "cascade",
          onDelete: "cascade",
        },
        resourceID: {
          type: Sequelize.BIGINT.UNSIGNED,
          references: {
            model: {
              tableName: "resources",
              modelName: "Resource",
            },
            key: "id",
          },
          allowNull: false,
          onUpdate: "cascade",
          onDelete: "cascade",
        },
        permissionID: {
          type: Sequelize.BIGINT.UNSIGNED,
          references: {
            model: {
              tableName: "permissions",
              modelName: "Permission",
            },
            key: "id",
          },
          allowNull: false,
          onUpdate: "cascade",
          onDelete: "cascade",
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        deletedBy: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: true,
          references: {
            model: {
              tableName: "users",
              modelName: "User",
            },
            key: "id",
          },
          onUpdate: "cascade",
          onDelete: "cascade",
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        createdBy: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: true,
          references: {
            model: {
              tableName: "users",
              modelName: "User",
            },
            key: "id",
          },
          onUpdate: "cascade",
          onDelete: "cascade",
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedBy: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: true,
          references: {
            model: {
              tableName: "users",
              modelName: "User",
            },
            key: "id",
          },
          onUpdate: "cascade",
          onDelete: "cascade",
        },
      },
      {
        uniqueKeys: {
          unique_user_resource_permission_deletedAt: {
            customIndex: true,
            fields: ["userID", "resourceID", "permissionID", "deletedAt"],
          },
        },
      }
    );
    /*.then(() =>
        queryInterface.addIndex("user_resource_permissions", [
          "userID",
          "resourceID",
          "permissionID",
          "deletedAt",
        ])
      )
      .then(() => {
        // perform further operations if needed
      })*/
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_resource_permissions");
  },
};
