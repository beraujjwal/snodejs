'use strict';
let bcrypt = require("bcryptjs");
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
        phone: '9475967638',
        email: 'bera.ujjwal@hotmail.com',
        password: bcrypt.hashSync('9475967638', 8),
        status:true,
        verified:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        phone: '7001698979',
        email: 'arpansantra@hotmail.com',
        password: bcrypt.hashSync('7001698979', 8),
        status:true,
        verified:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        phone: '9830773973',
        email: 'ushabera@hotmail.com',
        password: bcrypt.hashSync('9830773973', 8),
        status:true,
        verified:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});



    await queryInterface.bulkInsert('user_translations', [
      {
        user_id: 1,
        lang: "en",
        name: 'Ujjwal Bera',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 1,
        lang: "bn",
        name: 'উজ্জ্বল বেরা',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 1,
        lang: "hi",
        name: 'उज्ज्वल बेरा',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        lang: "en",
        name: 'Arpan Santra',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        lang: "bn",
        name: 'অর্পণ সাঁতরা',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        user_id: 2,
        lang: "hi",
        name: 'अर्पण संतरा',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 3,
        lang: "en",
        name: 'Usha Bera',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 3,
        lang: "bn",
        name: 'উষা বেরা',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 3,
        lang: "hi",
        name: 'उषा बेरा',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
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
     await queryInterface.bulkDelete('user_translations', null, {});
     await queryInterface.bulkDelete('users', null, {});
  }
};
