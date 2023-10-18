'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cities', {
      id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      stateId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'states',
            modelName: 'State'
          },
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    }).then(() => queryInterface.addIndex('cities', ['name', 'stateId']));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cities');
  }
};
