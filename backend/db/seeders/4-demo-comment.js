'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Comments';
   await queryInterface.bulkInsert(options, [
    {
      userId: 1,
      songId: "3",
      body: "Yes! Awesome beats!"
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
    options.tableName = 'Comments';
   await queryInterface.bulkDelete(options, null, {});
  }
};
