"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .bulkInsert(
        "roles",
        [
          {
            id: 1,
            parentID: null,
            name: "Super Admin",
            slug: "super-admin",
            status: true,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 2,
            parentID: null,
            name: "Admin",
            slug: "admin",
            status: true,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 3,
            parentID: null,
            name: "Manager",
            slug: "manager",
            status: true,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
        ],
        {}
      )
      .catch((error) => {
        console.error(error);
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {}).catch((error) => {
      console.error(error);
    });
  },
};
