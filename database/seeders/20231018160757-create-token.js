"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .bulkInsert(
        "tokens",
        [
          {
            id: 1,
            userID: 1,
            token: "543210",
            sentTo: "phone",
            sentOn: "9876543210",
            sentFor: "ACTIVATION",
            status: true,
            expireAt: new Date(),
            createdAt: new Date(),
          },
          {
            id: 2,
            userID: 2,
            token: "543211",
            sentTo: "phone",
            sentOn: "9876543211",
            sentFor: "ACTIVATION",
            status: true,
            expireAt: new Date(),
            createdAt: new Date(),
          },
          {
            id: 3,
            userID: 3,
            token: "543212",
            sentTo: "phone",
            sentOn: "9876543212",
            sentFor: "ACTIVATION",
            status: true,
            expireAt: new Date(),
            createdAt: new Date(),
          },
        ],
        {}
      )
      .catch((error) => {
        console.error(error);
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tokens", null, {}).catch((error) => {
      console.error(error);
    });
  },
};
