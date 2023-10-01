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

    await queryInterface.bulkInsert('users', [
      {
        name: 'Ujjwal Bera',
        phone: '9876543210',
        email: 'super-admin@hotmail.com',
        password: '$2a$09$yieBsv1UgvVgPdBBOzV4l.SujiWdgGlV5csLUauCBiTZ.J/qRP42C',
        tokenSalt: 123456,
        loginAttempts: 0,
        status:true,
        verified:true,
        deletedAt: null,
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
     * await queryInterface.bulkDelete('Users', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
