const movieService = require('../services/movieService');


exports.createMovie = async (req, res) => {
  try {
    const { title } = req.body
    // поверка на существование актера с таким именем
    const existingMovie = await movieService.findMovieByTitle(title); //реализован в actorService
    if (existingMovie) {
      return res.status(400).json({ message: 'фильм с таким именем уже существует' });
    }
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error);
    res.status(500).json({ message: 'Ошибка при создании фильма', error });
  }
};


exports.getMovies = async (req, res) => {
  try {
    const movies = await movieService.getMovies(req.query);
    res.json(movies);
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); 
    res.status(500).json({ message: 'Ошибка при получении фильмов', error });
  }
};


exports.getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); 
    res.status(500).json({ message: 'Ошибка при получении фильма', error });
  }
};


exports.updateMovie = async (req, res) => {
  try {
    const movie = await movieService.updateMovie(req.params.id, req.body);
    if (!movie) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); 
    res.status(500).json({ message: 'Ошибка при обновлении фильма', error });
  }
};


exports.deleteMovie = async (req, res) => {
  try {
    const success = await movieService.deleteMovie(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    res.json({ message: 'Фильм удален' });
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); 
    res.status(500).json({ message: 'Ошибка при удалении фильма', error });
  }
};


exports.addActorToMovie = async (req, res) => {
  try {
    const movie = await movieService.addActorToMovie(req.params.id, req.body.actorId);
    if (!movie) {
      return res.status(404).json({ message: 'Фильм или актер не найдены' });
    }
    res.json({ message: 'Актер добавлен к фильму' });
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); 
    res.status(500).json({ message: 'Ошибка при добавлении актера к фильму', error });
  }
};


exports.removeActorFromMovie = async (req, res) => {
  try {
    const movie = await movieService.removeActorFromMovie(req.params.id, req.params.actorId);
    if (!movie) {
      return res.status(404).json({ message: 'Фильм или актер не найдены' });
    }
    res.json({ message: 'Актер удален из фильма' });
  } catch (error) {
    console.error('Ошибка при получении фильмов:', error); 
    res.status(500).json({ message: 'Ошибка при удалении актера из фильма', error });
  }
};
