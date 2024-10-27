'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      // Связь "один ко многим" с Director
      Movie.belongsTo(models.Director, { foreignKey: 'directorId' });

      // Связь "многие ко многим" с Genre
      Movie.belongsToMany(models.Genre, { through: 'MoviesGenres', foreignKey: 'movieId' });

      // Связь "многие ко многим" с Actor
      Movie.belongsToMany(models.Actor, { through: 'MoviesActors', foreignKey: 'movieId' });
    }
  }
  
  Movie.init({
    title: DataTypes.STRING,
    release_year: DataTypes.INTEGER,
    run_time: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    meta_score: DataTypes.FLOAT,
    votes: DataTypes.INTEGER,
    gross: DataTypes.FLOAT,
    directorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });

  return Movie;
};
