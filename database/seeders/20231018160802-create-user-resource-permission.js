'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_resource_permissions', [
      {
        id: 1,
        userId: 1,
        roleId: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 2,
        roleId: 2,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_resource_permissions', null, {});
  }
};
