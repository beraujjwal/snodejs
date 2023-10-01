'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('resource_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resourceId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'resources',
            modelName: 'Resource'
          },
          key: 'id'
        },
        allowNull: false
      },
      permissionId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'permissions',
            modelName: 'Permission'
          },
          key: 'id'
        },
        allowNull: false
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
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('resource_permissions');
  }
};
