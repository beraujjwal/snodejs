"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .bulkInsert(
        "user_resource_permissions",
        [
          {
            id: 1,
            userID: 2,
            resourceID: 6,
            permissionID: 11,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 2,
            userID: 2,
            resourceID: 4,
            permissionID: 2,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 3,
            userID: 2,
            resourceID: 4,
            permissionID: 3,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 4,
            userID: 2,
            resourceID: 4,
            permissionID: 4,
            status: true,
            deletedAt: null,
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
    await queryInterface
      .bulkDelete("user_resource_permissions", null, {})
      .catch((error) => {
        console.error(error);
      });
  },
};
