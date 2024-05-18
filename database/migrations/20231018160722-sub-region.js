"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "sub_regions",
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
          regionID: {
            type: Sequelize.BIGINT.UNSIGNED,
            references: {
              model: {
                tableName: "regions",
                modelName: "Region",
              },
              key: "id",
            },
            allowNull: false,
            onUpdate: "cascade",
            onDelete: "cascade",
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

      await queryInterface.addIndex("sub_regions", ["name"], {
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
      await queryInterface.dropTable("sub_regions", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
