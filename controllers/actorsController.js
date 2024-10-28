const actorService = require('../services/actorService');


exports.createActor = async (req, res) => {
    try {
        let { name } = req.body;

        // валидация: проверка наличия имени
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'поле "name" обязательно для заполнения и не может быть пустым' });
        }
        // удаление лишних пробелов и проверка на наличие цифр
        name = name.trim().replace(/\s+/g, ' '); // лишние пробелы
        if (!/^[a-zA-Zа\s]+$/.test(name)) { // наличие только букв и пробелов
            return res.status(400).json({ message: 'имя может содержать только буквы и пробелы' });
        }

        // проверка на существование актера с таким именем
        const existingActor = await actorService.findActorByName(name); // Предполагается, что этот метод реализован в actorService
        if (existingActor) {
            return res.status(400).json({ message: 'Актер с таким именем уже существует' });
        }
        // сосдать актера через сервис
        const actor = await actorService.createActor({ name });
        res.status(201).json(actor);
    } catch (error) {
        console.error('Ошибка при получении фильмов:', error); // Выводим ошибку в консоль
        res.status(500).json({ message: 'Ошибка при создании актера', error });
    }
};
//  фильмы с фильтрацией и пагинацией
exports.getActors = async (req, res) => {
    try {
        const actors = await actorService.getActors(req.query);
        res.json(actors);
    } catch (error) {
        console.error('Ошибка при получении фильмов:', error); // Выводим ошибку в консоль
        res.status(500).json({ message: 'Ошибка при получении фильмов', error });
    }
};

exports.getActorById = async (req, res) => {
    try {
        const actor = await actorService.getActorById(req.params.id);
        if (!actor) {
            return res.status(404).json({ message: 'фильм не найден' });
        }
        res.json(actor);
    } catch (error) {
        console.error('Ошибка при получении фильмов:', error); // Выводим ошибку в консоль
        res.status(500).json({ message: 'Ошибка при получении фильма', error });
    }
};