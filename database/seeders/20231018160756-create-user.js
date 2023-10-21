'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 9;
    const salt = await bcrypt.genSalt(saltRounds);
    const passsword1 = bcrypt.hashSync('9876543210', salt);
    const passsword2 = bcrypt.hashSync('9876543211', salt);
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Ujjwal Bera',
        phone: '9876543210',
        isPhoneVerified:true,
        email: 'super-admin@yopmail.com',
        isEmailVerified:true,
        password: passsword1,
        tokenSalt: 123456,
        loginAttempts: 0,
        blockExpires: null,
        status:true,
        verified:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Ujjwal Bera',
        phone: '9876543211',
        isPhoneVerified:true,
        email: 'admin@yopmail.com',
        isEmailVerified:true,
        password: passsword2,
        tokenSalt: 123456,
        loginAttempts: 0,
        blockExpires: null,
        status:true,
        verified:true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}).catch(error => { console.error(error)});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {}).catch(error => { console.error(error)});
  }
};
