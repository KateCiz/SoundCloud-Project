'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Songs';
   await queryInterface.bulkInsert(options, [
    {
      userId: 1,
      albumId: 1,
      title: "Ready Or Not",
      description: "Life keeps moving and the only constant is change (this song is actually Inspiring Cinematic Ambient by Lexin Music)",
      url: "https://res.cloudinary.com/dymmlu1dw/video/upload/v1671303641/soundcloud/inspiring-cinematic-ambient-116199_bbuuyf.mp3",
      previewImage: "https://res.cloudinary.com/dymmlu1dw/image/upload/v1662237824/soundcloud/pexels-olga-1146242_zzccoz.jpg"
    },
    {
      userId: 1,
      albumId: 1,
      title: "Fall",
      description: "Nature sounds (this song is actually In The Forest 2 by Lesfm)",
      url: "https://res.cloudinary.com/dymmlu1dw/video/upload/v1663000068/soundcloud/in-the-forest-2-21402_vdnfjw.mp3",
      previewImage: "https://res.cloudinary.com/dymmlu1dw/image/upload/v1662425171/soundcloud/pexels-pixabay-235767_snmmoo.jpg"
    },
    {
      userId: 2,
      albumId: 2,
      title: "Code On",
      description: "Never give up (this song is actually Lifelike by AlexiAction)",
      url: "https://res.cloudinary.com/dymmlu1dw/video/upload/v1671303634/soundcloud/lifelike-126735_ruye9n.mp3",
      previewImage: "https://res.cloudinary.com/dymmlu1dw/image/upload/v1662238154/soundcloud/pexels-alex-green-5700184_wcty9r.jpg"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Songs';
    await queryInterface.bulkDelete(options);
  }
};
