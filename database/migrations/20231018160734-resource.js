'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('resources', {
      id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      parentId: {
        type: Sequelize.BIGINT(11),
        references: {
          model: {
            tableName: 'resources',
            modelName: 'Resource'
          },
          key: 'id'
        },
        allowNull: true,
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('resources');
  }
};
