const { Actor } = require('../models');

const createActor = async (data) => {
    const { name } = data;
    const actor = await Actor.create({ name });

    return actor;
};

const findActorByName = async (name) => {
    return await Actor.findOne({ where: { name } });
};

// Получение фильмов с фильтрацией и пагинацией
const getActors = async (query) => {
	const { page = 1, limit = 10, movieId } = query;
	const offset = (page - 1) * limit;
	const where = {};
	const include = [];

	
	// if (genreId) include.push({ model: Genre, where: { id: genreId }, through: { attributes: [] } });
	if (movieId) include.push({ model: MoviesActors, where: { id: movieId }, through: { attributes: [] } });

	return await Actor.findAndCountAll({ where, include, limit: parseInt(limit), offset, distinct: true });
};
const getActorById = async (id) => {
	return await Actor.findByPk(id, {
		include: [{ all: true }] // Включает связанные модели (Genre, Director, Actor)
	});
};

module.exports = {
    createActor,
    findActorByName,
    getActors,
    getActorById
}