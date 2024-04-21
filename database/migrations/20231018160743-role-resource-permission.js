"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "role_resource_permissions",
        {
          id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          roleID: {
            type: Sequelize.BIGINT.UNSIGNED,
            references: {
              model: {
                tableName: "roles",
                modelName: "Role",
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
            references: {
              model: {
                tableName: "users",
                modelName: "User",
              },
              key: "id",
            },
            onUpdate: "cascade",
            onDelete: "cascade",
            allowNull: true,
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
        { transaction }
      );

      await queryInterface.addIndex(
        "role_resource_permissions",
        ["roleID", "resourceID", "permissionID"],
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }

    // queryInterface.addConstraint("role_resource_permissions", {
    //     type: "FOREIGN KEY",
    //     name: "role_resource_permissions_role_id_fkey",
    //     fields: ["roleId"],
    //     references: {
    //         table: "roles",
    //         field: "id"
    //     }
    // });
    // queryInterface.addConstraint("role_resource_permissions", {
    //     type: "FOREIGN KEY",
    //     name: "role_resource_permissions_user_id_fkey",
    //     fields: ["user_id"],
    //     references: {
    //         table: "auth_user",
    //         field: "id"
    //     }
    // });
    // queryInterface.addConstraint("role_resource_permissions", {
    //     type: "FOREIGN KEY",
    //     name: "role_resource_permissions_role_id_fkey",
    //     fields: ["role_id"],
    //     references: {
    //         table: "role",
    //         field: "id"
    //     }
    // });
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("role_resource_permissions", "roleID");
      await queryInterface.removeColumn(
        "role_resource_permissions",
        "resourceID"
      );
      await queryInterface.removeColumn(
        "role_resource_permissions",
        "permissionID"
      );

      await queryInterface.dropTable("role_resource_permissions", {
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
