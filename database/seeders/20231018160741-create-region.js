"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .bulkInsert(
        "regions",
        [
          {
            id: 1,
            name: "Africa",
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 2,
            name: "Americas",
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 3,
            name: "Asia",
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 4,
            name: "Europe",
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 5,
            name: "Oceania",
            status: true,
            deletedAt: null,
            createdAt: new Date(),
            createdBy: 1,
            updatedAt: new Date(),
            updatedBy: 1,
          },
          {
            id: 6,
            name: "Polar",
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
    await queryInterface.bulkDelete("regions", null, {}).catch((error) => {
      console.error(error);
    });
  },
};
