'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Comments', [
    {
      userId: 1,
      songId: "3",
      body: "Yes queen!"
    },
    {
      userId: 2,
      songId: "1",
      body: "Mad vibes"
    },
    {
      userId: 3,
      songId: "2",
      body: "Best Song Ever!!!"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Comments', null, {});
  }
};
