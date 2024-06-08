"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("user_devices", {
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
        userToken: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        deviceId: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        deviceType: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        deviceSalt: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        ip: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        os: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        browser: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        city: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        state: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        country: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        latitude: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        longitude: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      })
      .then(() =>
        queryInterface.addIndex("user_devices", ["deviceId", "userID"])
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_devices");
  },
};
