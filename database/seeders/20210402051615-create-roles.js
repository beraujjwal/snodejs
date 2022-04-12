'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('roles', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('roles', [{
		id: 1,
		slug: 'administrator',
		name: 'Administrator',
		description: 'Administrator',
		status:true,
		created_by:1,
		created_at: new Date(),
		updated_at: new Date()
    },
    {
		id: 2,
		slug: 'editor',
		name: 'Editor',
		description: 'Editor',
		status:true,
		created_by:1,
		created_at: new Date(),
		updated_at: new Date()
    },
    {
		id: 3,
		slug: 'author',
		name: 'Author',
		description: 'Author',
		status:true,
		created_by:1,
		created_at: new Date(),
		updated_at: new Date()
    },
    {
		id: 4,
		slug: 'contributor',
		name: 'Contributor',
		description: 'Contributor',
		status:true,
		created_by:1,
		created_at: new Date(),
		updated_at: new Date()
    },
    {
		id: 5,
		slug: 'subscriber',
		name: 'Subscriber',
		description: 'Subscriber',
		status:true,
		created_by:1,
		created_at: new Date(),
		updated_at: new Date()
    }], {});

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
     await queryInterface.bulkDelete('roles', null, {});
  }
};
