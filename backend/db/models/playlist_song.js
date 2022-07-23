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
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    playlistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist_Song',
  });
  return Playlist_Song;
};