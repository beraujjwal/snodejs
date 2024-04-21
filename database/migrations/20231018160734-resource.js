"use strict";
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dbName = process.env.DB_CONNECTION;
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "resources",
        {
          id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          parentID: {
            type: Sequelize.BIGINT.UNSIGNED,
            references: {
              model: {
                tableName: "resources",
                modelName: "Resource",
              },
              key: "id",
            },
            allowNull: true,
            onUpdate: "cascade",
            onDelete: "cascade",
          },
          name: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          slug: {
            type: Sequelize.STRING(50),
            unique: true,
            allowNull: false,
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
        { transaction }
      );
      if (dbName === "mysql") {
        await queryInterface.sequelize.query(
          `
        CREATE TRIGGER IF NOT EXISTS alter_resources_slug_on_delete
          BEFORE UPDATE ON resources
          FOR EACH ROW
            BEGIN
              IF NEW.deletedAt != null THEN
                SET NEW.slug = CONCAT(OLD.slug, '-', OLD.id);
              END IF;
        END;`,
          { transaction }
        );
      }
      await queryInterface.addIndex("resources", ["name", "slug", "parentID"], {
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
      await queryInterface.sequelize.query(
        `DROP TRIGGER IF EXISTS alter_resources_slug_on_delete`
      );
      await queryInterface.dropTable("resources");
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
