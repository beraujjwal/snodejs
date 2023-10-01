'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('permissions', [
      {
        name: 'Full Access',
        slug: 'fullAccess',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'List View',
        slug: 'listView',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Drop-down List',
        slug: 'drop-downList',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Single Details View',
        slug: 'singleDetailsView',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Create New',
        slug: 'createNew',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Update Existing',
        slug: 'updateExisting',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delete Existing',
        slug: 'deleteExisting',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Download Single Details',
        slug: 'downloadSingleDetails',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Download List',
        slug: 'downloadList',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Manage Columns',
        slug: 'manageColumns',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Full Deny',
        slug: 'fullDeny',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Others',
        slug: 'others',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});




    //await queryInterface.sequelize.query('CREATE TRIGGER...')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('roles', null, {});
     */

     //await queryInterface.sequelize.query('DROP TRIGGER...')
     await queryInterface.bulkDelete('permissions', null, {});
  }
};
