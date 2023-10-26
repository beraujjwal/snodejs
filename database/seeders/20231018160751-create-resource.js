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
      },
      {
        id: 2,
        parentId: null,
        name: 'User Management',
        slug: 'user-management',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        parentId: null,
        name: 'ACL Management',
        slug: 'acl-management',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        parentId: 3,
        name: 'Role Section',
        slug: 'role-section',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        parentId: 3,
        name: 'Resource Section',
        slug: 'resource-section',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        parentId: 3,
        name: 'Permission Section',
        slug: 'permission-section',
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
