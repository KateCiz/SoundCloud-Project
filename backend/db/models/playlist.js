'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
   
    static associate(models) {
      Playlist.belongsTo(models.User, {foreignKey: 'userId'})
      Playlist.belongsToMany(models.Song, { through: models.Playlist_Song, otherKey: 'songId', foreignKey: 'playlistId'})
    }
  }
  Playlist.init({
    userId: DataTypes.INTEGER,
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};