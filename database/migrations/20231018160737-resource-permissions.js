'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('resource_permissions', {
      id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      resourceId: {
        type: Sequelize.BIGINT(11),
        references: {
          model: {
            tableName: 'resources',
            modelName: 'Resource'
          },
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      permissionId: {
        type: Sequelize.BIGINT(11),
        references: {
          model: {
            tableName: 'permissions',
            modelName: 'Permission'
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
        allowNull: true,
        defaultValue: null
      },
      deletedBy: {
        type: Sequelize.BIGINT(11),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      createdBy: {
        type: Sequelize.BIGINT(11),
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedBy: {
        type: Sequelize.BIGINT(11),
        allowNull: true,
      },
    }).then(() => queryInterface.addIndex('resource_permissions', ['resourceId', 'permissionId']));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('resource_permissions');
  }
};
