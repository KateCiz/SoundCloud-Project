'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Users', [
  {
    id: 1,
    firstName: "Demo",
    lastName: "User",
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password'),
    isArtist: true
    },
  {
    id: 2,
    firstName: "Fake",
    lastName: "User",
    email: 'user1@user.io',
    username: 'FakeUser1',
    hashedPassword: bcrypt.hashSync('password2'),
    isArtist: true
    },
  {
    id: 3,
    firstName: "Imaginary",
    lastName: "User",
    email: 'user2@user.io',
    username: 'FakeUser2',
    hashedPassword: bcrypt.hashSync('password3'),
    isArtist: false
    }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
