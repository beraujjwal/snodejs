'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        unique: true,
        allowNull: false
      },
      code: {
        type: Sequelize.DataTypes.STRING(2),
        unique: true,
        allowNull: false
      },
      phoneCode: {
        type: Sequelize.DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      status: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      deletedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }).then(() => queryInterface.addIndex('states', ['name', 'code', 'phoneCode']));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('countries');
  }
};
