'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist_Song extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  Playlist_Song.init({
    playlistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist_Song',
  });
  return Playlist_Song;
};