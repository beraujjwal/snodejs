'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        parentId: null,
        name: 'Super Admin',
        slug: 'super-admin',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        parentId: null,
        name: 'Admin',
        slug: 'admin',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        parentId: null,
        name: 'Manager',
        slug: 'manager',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}).catch(error => { console.error(error)});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {}).catch(error => { console.error(error)});
  }
};