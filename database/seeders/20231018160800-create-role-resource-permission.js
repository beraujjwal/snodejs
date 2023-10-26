'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role_resource_permissions', [
      {
        id: 1,
        roleId: 1,
        resourceId: 1,
        permissionId: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        roleId: 2,
        resourceId: 1,
        permissionId: 11,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        roleId: 3,
        resourceId: 1,
        permissionId: 11,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        roleId: 2,
        resourceId: 2,
        permissionId: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        roleId: 3,
        resourceId: 2,
        permissionId: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        roleId: 2,
        resourceId: 3,
        permissionId: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        roleId: 3,
        resourceId: 3,
        permissionId: 11,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        roleId: 2,
        resourceId: 4,
        permissionId: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        roleId: 2,
        resourceId: 5,
        permissionId: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        roleId: 2,
        resourceId: 6,
        permissionId: 1,
        status:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}).catch(error => { console.error(error)});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_resource_permissions', null, {}).catch(error => { console.error(error)});
  }
};
