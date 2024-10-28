const { Actor, Movie } = require('../models');

const createActor = async (data) => {
	const { name } = data;
	const actor = await Actor.create({ name });

	return actor;
};

const findActorByName = async (name) => {
	return await Actor.findOne({ where: { name } });
};

// актеры с фильтрацией и пагинацией
const getActors = async (query) => {
	const { page = 1, limit = 10, movieId } = query;
	const offset = (page - 1) * limit;
	const include = [];


	// if (genreId) include.push({ model: Genre, where: { id: genreId }, through: { attributes: [] } });
	if (movieId) include.push({ model: Movie, where: { id: movieId }, through: { attributes: [] } });
                                                                    //УБРАТЬ промежуточные данные из MoviesActors                   
	return await Actor.findAndCountAll({
		include,
		limit: parseInt(limit),
		offset,
		distinct: true // Yдал дубли при использовании include
	});
};

const getActorById = async (id) => {
	return await Actor.findByPk(id, {
		include: [{ all: true }] // включает связанные модели 
	});
};

module.exports = {
	createActor,
	findActorByName,
	getActors,
	getActorById
}