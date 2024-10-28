
const { Movie, Genre, Director, Actor } = require('../models');

// создание фильма
const createMovie = async (data) => {
	const { title, release_year, run_time, rating, meta_score, votes, gross, directorId, genres, actors } = data;
	const movie = await Movie.create({ title, release_year, run_time, rating, meta_score, votes, gross, directorId });

	// жанры к фильму
	if (genres) {
		const genreInstances = await Genre.findAll({ where: { id: genres } });
		await movie.addGenres(genreInstances);
	}

	// актеры к фильму
	if (actors) {
		const actorInstances = await Actor.findAll({ where: { id: actors } });
		await movie.addActors(actorInstances);
	}

	return movie;
};
const findMovieByTitle = async (title) => {
	return await Movie.findOne({ where: { title } });
};

// фильмы с фильтрацией и пагинацией
const getMovies = async (query) => {
	const { page = 1, limit = 10, directorId, genreId, actorId } = query;
	const offset = (page - 1) * limit;
	const where = {};
	const include = [];

	if (directorId) where.directorId = directorId; // по режиссеру
	if (genreId) include.push({ model: Genre, where: { id: genreId }, through: { attributes: [] } }); // по жанру
	if (actorId) include.push({ model: Actor, where: { id: actorId }, through: { attributes: [] } }); // по актеру

	return await Movie.findAndCountAll({ where, include, limit: parseInt(limit), offset, distinct: true });
};

// фильм по ID
const getMovieById = async (id) => {
	return await Movie.findByPk(id, {
		include: [{ all: true }] // включает связанные модели (Genre, Director, Actor)
	});
};

// обновление фильма
const updateMovie = async (id, data) => {
	const movie = await Movie.findByPk(id);
	if (movie) {
		await movie.update(data);
	}
	return movie;
};

// удаление фильма
const deleteMovie = async (id) => {
	const movie = await Movie.findByPk(id);
	if (movie) {
		await movie.destroy();
		return true;
	}
	return false;
};

// актер к фильму
const addActorToMovie = async (movieId, actorId) => {
	const movie = await Movie.findByPk(movieId);
	const actor = await Actor.findByPk(actorId);
	if (movie && actor) {
		await movie.addActor(actor);
		return movie;
	}
	return null;
};

// удал актера из фильма
const removeActorFromMovie = async (movieId, actorId) => {
	const movie = await Movie.findByPk(movieId);
	const actor = await Actor.findByPk(actorId);
	if (movie && actor) {
		await movie.removeActor(actor);
		return movie;
	}
	return null;
};

module.exports = {
	getMovies,
	createMovie,
	findMovieByTitle,
	updateMovie,
	deleteMovie,
	getMovieById,
	addActorToMovie,
	removeActorFromMovie
};

