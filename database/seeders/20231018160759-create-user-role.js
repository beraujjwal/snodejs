'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_roles', [
      {
        id: 1,
        userID: 1,
        roleID: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userID: 2,
        roleID: 2,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userID: 3,
        roleID: 3,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}).catch(error => { console.error(error)});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {}).catch(error => { console.error(error)});
  }
};
