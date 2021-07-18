'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('verification_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      expire_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      //console.log('created VerificationToken table');
      /*return queryInterface.sequelize.query(`
        CREATE EVENT expire_token
          ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL  1 DAY 
          DO
          DELETE FROM verification_tokens WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 DAY);
      `)*/
    }).then(() => { console.log('expireToken event created') });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('verification_tokens').then(() => {
	    //resconsole.log(`VericationTokens table dropped`)
	    /*return queryInterface.sequelize.query(`DROP EVENT IF EXISTS expire_token`);*/
    }).then(() => { /*console.log(`expireToken event dropped`)*/ })
  }
};