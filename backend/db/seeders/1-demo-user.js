'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users'; 
   await queryInterface.bulkInsert(options, [
  {
    firstName: "Demo",
    lastName: "User",
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password'),
    isArtist: true
    },
  {
    firstName: "Fake",
    lastName: "User",
    email: 'user1@user.io',
    username: 'FakeUser1',
    hashedPassword: bcrypt.hashSync('password2'),
    isArtist: true
    },
  {
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
    options.tableName = 'Users'; 
    await queryInterface.bulkDelete(options, null, {});
  }
};
