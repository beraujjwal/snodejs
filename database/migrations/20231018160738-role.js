'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
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
            tableName: 'roles',
            modelName: 'Role'
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
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      }
    }).then(() => queryInterface.addIndex('roles', ['name', 'slug', 'parentId']));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};
