'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_resource_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
            modelName: 'User'
          },
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('user_resource_permissions');
  }
};
