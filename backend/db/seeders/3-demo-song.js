'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Songs', [
    {
      userId: 1,
      albumId: 1,
      title: "Yolo",
      description: "Hope I pass",
      url: "audio url",
      previewImage: "image url"
    },
    {
      userId: 1,
      albumId: 1,
      title: "Living On A Code Review",
      description: "Needed a laugh",
      url: "audio url",
      previewImage: "image url"
    },
    {
      userId: 2,
      albumId: 2,
      title: "Code On",
      description: "Never give up",
      url: "audio url",
      previewImage: "image url"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
