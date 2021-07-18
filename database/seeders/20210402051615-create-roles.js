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
      slug: 'admin',
      status:true,
      created_by:1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      slug: 'vendor',
      status:true,
      created_by:1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      slug: 'customer',
      status:true,
      created_by:1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});



    await queryInterface.bulkInsert('role_translations', [
      {
        role_id: 1,
        lang: "en",
        name: 'Admin',
        description: 'admin',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 1,
        lang: "bn",
        name: 'অ্যাডমিন',
        description: 'অ্যাডমিন',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 1,
        lang: "hi",
        name: 'व्यवस्थापक',
        description: 'व्यवस्थापक',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 2,
        lang: "en",
        name: 'Vendor',
        description: 'vendor',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 2,
        lang: "bn",
        name: 'বিক্রেতা',
        description: 'বিক্রেতা',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 2,
        lang: "hi",
        name: 'विक्रेता',
        description: 'विक्रेता',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 3,
        lang: "en",
        name: 'Customer',
        description: 'customer',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 3,
        lang: "bn",
        name: 'ক্রেতা',
        description: 'ক্রেতা',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 3,
        lang: "hi",
        name: 'ग्राहक',
        description: 'ग्राहक',
        status:true,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('user_roles', [{
      user_id: 1,
      role_id: 1,
      status:true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: 1,
      role_id: 2,
      status:true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: 2,
      role_id: 2,
      status:true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: 3,
      role_id: 3,
      status:true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('roles', null, {});
     */
     await queryInterface.bulkDelete('user_roles', null, {});
     await queryInterface.bulkDelete('role_translations', null, {});
     await queryInterface.bulkDelete('roles', null, {});
  }
};
