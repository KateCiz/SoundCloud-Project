'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Albums'; 
   await queryInterface.bulkInsert(options, [
    {
      userId: 1,
      title: "Now & Forever",
      description: "Has hits like 'Ready Or Not' & 'Fall'",
      previewImage: "https://res.cloudinary.com/dymmlu1dw/image/upload/v1662237824/soundcloud/pexels-olga-1146242_zzccoz.jpg"
    },
    {
      userId: 2,
      title: "Rock The Code",
      description: "Has the one hit wonder 'Code On'",
      previewImage: "https://res.cloudinary.com/dymmlu1dw/image/upload/v1662238154/soundcloud/pexels-alex-green-5700184_wcty9r.jpg"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Albums';
    await queryInterface.bulkDelete(options, null, {});
  }
};
