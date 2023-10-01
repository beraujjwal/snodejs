'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      isPhoneVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tokenSalt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      loginAttempts: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      blockExpires: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deviceId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      deviceType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fcmToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('users', ['name', 'phone', 'email']))
    .then(() => {
        // perform further operations if needed
    });





  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};