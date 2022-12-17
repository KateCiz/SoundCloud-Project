'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Playlists';
   await queryInterface.bulkInsert(options, [
    {
      userId: 3,
      name: "All my favorites",
      previewImage: "image url"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Playlists';
   await queryInterface.bulkDelete(options);
  }
};
