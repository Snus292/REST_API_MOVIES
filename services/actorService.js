const { Actor } = require('../models');

const createActor = async (data) => {
	const { name } = data;
	const actor = await Actor.create({ name });

	return actor;
};

const findActorByName = async (name) => {
    return await Actor.findOne({ where: { name } });
  };
module.exports = {
    createActor,
    findActorByName
}