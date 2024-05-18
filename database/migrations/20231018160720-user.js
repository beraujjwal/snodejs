"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "users",
        {
          id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          phone: {
            type: Sequelize.STRING(15),
            unique: true,
            allowNull: false,
          },
          isPhoneVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: true,
          },
          isEmailVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          loginAttempts: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          blockExpires: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false,
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
        { transaction }
      );

      await queryInterface.addIndex("users", ["name", "phone", "email"], {
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      //await queryInterface.removeColumn("users", "roleId");
      //await queryInterface.removeColumn("users", "resourceId");
      //await queryInterface.removeColumn("users", "permissionId");

      await queryInterface.dropTable("users", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};