'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActorsMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActorsMovies.init({
    movieId: DataTypes.INTEGER,
    actorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ActorsMovies',
  });
  return ActorsMovies;
};