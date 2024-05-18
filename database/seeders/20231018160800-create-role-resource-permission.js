"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .bulkInsert(
        "role_resource_permissions",
        [
          {
            id: 1,
            roleID: 1,
            resourceID: 1,
            permissionID: 1,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 2,
            roleID: 2,
            resourceID: 1,
            permissionID: 11,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 3,
            roleID: 3,
            resourceID: 1,
            permissionID: 11,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 4,
            roleID: 2,
            resourceID: 2,
            permissionID: 1,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 5,
            roleID: 3,
            resourceID: 2,
            permissionID: 1,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 6,
            roleID: 2,
            resourceID: 3,
            permissionID: 1,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 7,
            roleID: 3,
            resourceID: 3,
            permissionID: 11,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 8,
            roleID: 2,
            resourceID: 4,
            permissionID: 1,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 9,
            roleID: 2,
            resourceID: 5,
            permissionID: 1,
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 10,
            roleID: 2,
            resourceID: 6,
            permissionID: 1,
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
      .bulkDelete("role_resource_permissions", null, {})
      .catch((error) => {
        console.error(error);
      });
  },
};
