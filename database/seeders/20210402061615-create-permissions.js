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
        name: 'Full',
        slug: 'full',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Create',
        slug: 'create',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Read',
        slug: 'eead',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Update',
        slug: 'update',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Delete',
        slug: 'delete',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Deny',
        slug: 'deny',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});



    await queryInterface.bulkInsert('role_permissions', [
      {
        permission_id: 1,
        role_id: 1,
        permission: 'READ_WRITE',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 2,
        role_id: 1,
        permission: 'READ_WRITE',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 3,
        role_id: 1,
        permission: 'READ_WRITE',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 4,
        role_id: 1,
        permission: 'READ_WRITE',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 5,
        role_id: 1,
        permission: 'READ_WRITE',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 6,
        role_id: 1,
        permission: 'READ_WRITE',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 4,
        role_id: 2,
        permission: 'READ',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 5,
        role_id: 2,
        permission: 'READ',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 6,
        role_id: 2,
        permission: 'READ',
        status:true,
        created_by:1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('user_permissions', [{
      permission_id: 1,
      user_id: 2,
      permission: 'OWN_READ_WRITE',
      status:true,
      created_by:1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});

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
     await queryInterface.bulkDelete('role_permissions', null, {});
     await queryInterface.bulkDelete('user_permissions', null, {});
     await queryInterface.bulkDelete('permissions', null, {});
  }
};
