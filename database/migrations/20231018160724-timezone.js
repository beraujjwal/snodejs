"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "timezones",
        {
          id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          code: {
            type: Sequelize.STRING(50),
            unique: true,
            allowNull: false,
          },
          utc: {
            type: Sequelize.STRING(10),
            allowNull: true,
          },
          gmt: {
            type: Sequelize.STRING(10),
            allowNull: true,
          },
          isDST: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          dstStartMonth: {
            type: Sequelize.STRING(10),
            defaultValue: null,
            allowNull: true,
          },
          dstStartWeek: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true,
          },
          dstStartDay: {
            type: Sequelize.STRING(10),
            defaultValue: null,
            allowNull: true,
          },
          dstStartTime: {
            type: Sequelize.TIME,
            defaultValue: null,
            allowNull: true,
          },
          dstEndMonth: {
            type: Sequelize.STRING(10),
            defaultValue: null,
            allowNull: true,
          },
          dstEndWeek: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true,
          },
          dstEndDay: {
            type: Sequelize.STRING(10),
            defaultValue: null,
            allowNull: true,
          },
          dstEndTime: {
            type: Sequelize.TIME,
            defaultValue: null,
            allowNull: true,
          },
          shift: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true,
          },
          order: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
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

      await queryInterface.addIndex("timezones", ["name", "code", "utc"], {
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
      await queryInterface.dropTable("timezones", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
