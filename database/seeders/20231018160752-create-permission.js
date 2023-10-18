'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
      {
        id: 1,
        name: 'Full Access',
        slug: 'fullAccess',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'List View',
        slug: 'listView',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Drop-down List',
        slug: 'drop-downList',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Single Details View',
        slug: 'singleDetailsView',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Create New',
        slug: 'createNew',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Update Existing',
        slug: 'updateExisting',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Delete Existing',
        slug: 'deleteExisting',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Download Single Details',
        slug: 'downloadSingleDetails',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Download List',
        slug: 'downloadList',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Manage Columns',
        slug: 'manageColumns',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: 'Full Deny',
        slug: 'fullDeny',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: 'Others',
        slug: 'others',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
