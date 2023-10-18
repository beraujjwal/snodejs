'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(11)
      },
      userId: {
        type: Sequelize.BIGINT(11),
        references: {
          model: {
            tableName: 'users',
            modelName: 'User'
          },
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      token: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      sentTo: {
        type: Sequelize.STRING,
        index: true,
        allowNull: false
      },
      sentOn: {
        type: Sequelize.STRING,
        index: true,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      expireAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
    }).then(() => {
      return queryInterface.sequelize.query(`
        CREATE EVENT expire_token
          ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 DAY
          DO
          DELETE FROM tokens WHERE createdAt < DATE_SUB(NOW(), INTERVAL 2 DAY);
      `)
    }).then(() => queryInterface.addIndex('tokens', ['userId', 'sentTo', 'sentOn', 'type']));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens').then(() => {
	    return queryInterface.sequelize.query(`DROP EVENT IF EXISTS expire_token`);
    });
  }
};
