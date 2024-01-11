'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tokens', [
      {
        id: 1,
        userID: 1,
        token: '951753',
        sentTo: 'phone',
        sentOn: '9876543210',
        type: 'ACTIVATION',
        status: true,
        expireAt: new Date(),
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userID: 2,
        token: '951357',
        sentTo: 'phone',
        sentOn: '9876543211',
        type: 'ACTIVATION',
        status: true,
        expireAt: new Date(),
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}).catch(error => { console.error(error)});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tokens', null, {}).catch(error => { console.error(error)});
  }
};
