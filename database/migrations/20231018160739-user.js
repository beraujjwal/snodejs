'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(11)
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(15),
        unique: true,
        allowNull: false
      },
      isPhoneVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: true
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      tokenSalt: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      loginAttempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      blockExpires: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deviceId: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      deviceType: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      fcmToken: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      }
    }).then(() => queryInterface.addIndex('users', ['name', 'phone', 'email']))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
