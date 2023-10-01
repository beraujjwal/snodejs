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

    await queryInterface.bulkInsert('roles', [{
        parentId: null,
        name: 'Admin',
        slug: 'admin',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('roles', null, {});
     */
     await queryInterface.bulkDelete('roles', null, {});
  }
};
