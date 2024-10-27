const movieService = require('../services/movieService');

// Создание фильма
exports.createMovie = async (req, res) => {
  try {
    const { title } = req.body
    // Проверка на существование актера с таким именем
    const existingMovie = await movieService.findMovieByTitle(title); // Предполагается, что этот метод реализован в actorService
    if (existingMovie) {
      return res.status(400).json({ message: 'фильм с таким именем уже существует' });
    }
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); // Выводим ошибку в консоль
    res.status(500).json({ message: 'Ошибка при создании фильма', error });
  }
};

// Получение фильмов с фильтрацией и пагинацией
exports.getMovies = async (req, res) => {
  try {
    const movies = await movieService.getMovies(req.query);
    res.json(movies);
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); // Выводим ошибку в консоль
    res.status(500).json({ message: 'Ошибка при получении фильмов', error });
  }
};

// Получение фильма по ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); // Выводим ошибку в консоль
    res.status(500).json({ message: 'Ошибка при получении фильма', error });
  }
};

// Обновление фильма
exports.updateMovie = async (req, res) => {
  try {
    const movie = await movieService.updateMovie(req.params.id, req.body);
    if (!movie) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении фильма', error });
  }
};

// Удаление фильма
exports.deleteMovie = async (req, res) => {
  try {
    const success = await movieService.deleteMovie(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    res.json({ message: 'Фильм удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении фильма', error });
  }
};

// Добавление актера к фильму
exports.addActorToMovie = async (req, res) => {
  try {
    const movie = await movieService.addActorToMovie(req.params.id, req.body.actorId);
    if (!movie) {
      return res.status(404).json({ message: 'Фильм или актер не найдены' });
    }
    res.json({ message: 'Актер добавлен к фильму' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении актера к фильму', error });
  }
};

// Удаление актера из фильма
exports.removeActorFromMovie = async (req, res) => {
  try {
    const movie = await movieService.removeActorFromMovie(req.params.id, req.params.actorId);
    if (!movie) {
      return res.status(404).json({ message: 'Фильм или актер не найдены' });
    }
    res.json({ message: 'Актер удален из фильма' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении актера из фильма', error });
  }
};
