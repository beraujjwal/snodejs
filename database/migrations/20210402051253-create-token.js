'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      expireAt: {
        allowNull: false,
        type: Sequelize.DATE
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
    }).then(() => {
      //console.log('created VerificationToken table');
      return queryInterface.sequelize.query(`
        CREATE EVENT expire_token
          ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL  1 DAY
          DO
          DELETE FROM tokens WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 DAY);
      `)
    }).then(() => { console.log('expireToken event created') });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tokens').then(() => {
	    //resconsole.log(`VericationTokens table dropped`)
	    return queryInterface.sequelize.query(`DROP EVENT IF EXISTS expire_token`);
    }).then(() => { console.log(`expireToken event dropped`) })
  }
};