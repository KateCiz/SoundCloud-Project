'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Playlist_Songs', [
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
    await queryInterface.bulkDelete('Playlist_Songs', null, {});
  }
};
