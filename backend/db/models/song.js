'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {

    static associate(models) {
      Song.hasMany(models.Comment, {foreignKey: 'songId'})
      Song.belongsTo(models.Album, {foreignKey: 'albumId'})
      Song.belongsTo(models.User, {foreignKey: 'userId', as: 'Artist'})
      Song.belongsToMany(models.Playlist, { through: models.Playlist_Song, otherKey: 'playlistId', foreignKey: 'songId',  onDelete: 'cascade', hooks: true})
    }
  }
  Song.init({
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: DataTypes.STRING,
    url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
