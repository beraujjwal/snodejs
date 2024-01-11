'use strict';
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dbName = process.env.DB_CONNECTION;
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('tokens', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        userID: {
          type: Sequelize.BIGINT,
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
          defaultValue: Sequelize.NOW
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
      }, { transaction });
      if(dbName === 'mysql') {
        await queryInterface.sequelize.query(`
          CREATE EVENT expire_token
            ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 DAY
            DO
            DELETE FROM tokens WHERE createdAt < DATE_SUB(NOW(), INTERVAL 2 DAY);
          `, { transaction });
      }

      await queryInterface.addIndex('tokens', ['userID', 'sentTo', 'sentOn', 'type'], { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(`DROP EVENT IF EXISTS expire_token`, { transaction });
      await queryInterface.dropTable('tokens', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
