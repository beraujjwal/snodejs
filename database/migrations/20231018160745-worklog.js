"use strict";
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "worklogs",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT.UNSIGNED,
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
          module: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          referenceId: {
            type: Sequelize.BIGINT.UNSIGNED,
            index: true,
            allowNull: false,
          },
          action: {
            type: Sequelize.STRING(30),
            index: true,
            allowNull: false,
          },
          deviceId: {
            type: Sequelize.STRING(50),
            index: true,
            allowNull: false,
          },
        },
        { transaction }
      );

      await queryInterface.addIndex(
        "worklogs",
        ["userID", "module", "action", "deviceId"],
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("worklogs", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
