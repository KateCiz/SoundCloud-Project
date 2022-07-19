'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {

    static associate(models) {
      Album.hasMany(models.Song, {foreignKey: 'albumId', onDelete: 'cascade', hooks: true})
      Album.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Album.init({
    userId: DataTypes.INTEGER,
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: DataTypes.STRING,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};

