'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_resource_permissions', [
      {
        id: 2,
        userId: 2,
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
    await queryInterface.bulkDelete('user_resource_permissions', null, {}).catch(error => { console.error(error)});
  }
};
