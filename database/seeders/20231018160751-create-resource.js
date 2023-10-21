'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('resources', [
      {
        id: 1,
        parentId: null,
        name: 'Root',
        slug: 'root',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}).catch(error => { console.error(error)});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('resources', null, {}).catch(error => { console.error(error)});
  }
};
