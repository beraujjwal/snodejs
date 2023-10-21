'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('resource_permissions', [
      {
        id: 1,
        resourceId: 1,
        permissionId: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        resourceId: 1,
        permissionId: 11,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}).catch(error => { console.error(error)});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('resource_permissions', null, {}).catch(error => { console.error(error)});
  }
};
