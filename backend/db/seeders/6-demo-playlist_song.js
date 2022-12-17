'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Playlist_Songs';
   await queryInterface.bulkInsert(options, [
    {
      playlistId: 1,
      songId: 1
    },
    {
      playlistId: 1,
      songId: 2
    },
    {
      playlistId: 1,
      songId: 3
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Playlist_Songs';
    await queryInterface.bulkDelete(options);
  }
};
