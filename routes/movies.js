const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// CRUD операции
router.post('/', moviesController.createMovie);
router.get('/', moviesController.getMovies);
router.get('/:id', moviesController.getMovieById);
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

// Управление актёрами
router.post('/:id/actors', moviesController.addActorToMovie);
router.delete('/:id/actors/:actorId', moviesController.removeActorFromMovie);

module.exports = router;
