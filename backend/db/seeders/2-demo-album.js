'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Albums', [
    {
      userId: 1,
      title: "Yolo & Code",
      description: "Has hits like 'Yolo' & 'Living On A Code Review'",
      previewImage: "image url"
    },
    {
      userId: 2,
      title: "Rock The Code",
      description: "Has the one hit wonder 'Code On'",
      previewImage: "image url"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
