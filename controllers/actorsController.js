const actorService = require('../services/actorService');

// Контроллер для создания актера с валидацией
exports.createActor = async (req, res) => {
  try {
    let { name } = req.body;

    // Валидация: проверка наличия имени
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Поле "name" обязательно для заполнения и не может быть пустым' });
    }
    // Форматирование имени: удаление лишних пробелов и проверка на наличие цифр
    name = name.trim().replace(/\s+/g, ' '); // Убираем лишние пробелы
    if (!/^[a-zA-Zа\s]+$/.test(name)) { // Проверка на наличие только букв и пробелов
      return res.status(400).json({ message: 'Имя может содержать только буквы и пробелы' });
    }

    // Проверка на существование актера с таким именем
    const existingActor = await actorService.findActorByName(name); // Предполагается, что этот метод реализован в actorService
    if (existingActor) {
      return res.status(400).json({ message: 'Актер с таким именем уже существует' });
    }
    // Создаем актера через сервис
    const actor = await actorService.createActor({ name });
    res.status(201).json(actor);
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); // Выводим ошибку в консоль
    res.status(500).json({ message: 'Ошибка при создании актера', error });
  }
};
