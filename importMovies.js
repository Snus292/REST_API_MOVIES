const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Movie, Genre, Director, Actor } = require('./models'); // Импорт всех необходимых моделей

// Путь к CSV файлу
const csvFilePath = path.join(__dirname, 'movies_imdb.csv'); 

// Функция для импорта данных
const importMovies = async () => {
  try {
    const moviesData = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        moviesData.push(row); // Читаем каждую строку из CSV
      })
      .on('end', async () => {
        console.log('CSV файл успешно прочитан. Импортируем данные в базу...');

        for (const movieRow of moviesData) {
          // Найдем или создадим режиссера
          const [director, createdDirector] = await Director.findOrCreate({
            where: { name: movieRow.Director.trim() }
          });

          
          // Создаем фильм с правильными полями
          const movie = await Movie.create({
            title: movieRow.Name.trim(),          // Поле 'Name' из CSV -> 'title'
            release_year: parseInt(movieRow.Year), // Поле 'Year' -> 'release_year'
            run_time: parseInt(movieRow.Run_time), // Поле 'Run_time' -> 'run_time'
            rating: parseFloat(movieRow.Rating),   // Поле 'Rating' -> 'rating'
            meta_score: parseFloat(movieRow.Meta_score), // Поле 'Meta_score' -> 'meta_score'
            votes: parseInt(movieRow.Votes),       // Поле 'Votes' -> 'votes'
            gross: parseFloat(movieRow.Gross),     // Поле 'Gross' -> 'gross'
            directorId: director.id                // Связь с режиссером
          });

          // === Обработка жанров ===
          const genresNames = movieRow.Genre.split(',').map(genre => genre.trim());
          for (const genreName of genresNames) {
            const [genre, createdGenre] = await Genre.findOrCreate({
              where: { name: genreName }
            });
            await movie.addGenre(genre);  // Связь "многие ко многим" между фильмом и жанром
          }

          // === Обработка актеров ===
          const actorsNames = movieRow.cast.split(',').map(actor => actor.trim());
          for (const actorName of actorsNames) {
            const [actor, createdActor] = await Actor.findOrCreate({
              where: { name: actorName }
            });
            await movie.addActor(actor);  // Связь "многие ко многим" между фильмом и актерами
          }

          console.log(`Фильм "${movieRow.Name}" добавлен в базу данных.`);
        }

        console.log('Импорт данных завершен.');
      });
  } catch (error) {
    console.error('Ошибка импорта данных:', error);
  }
};

// Запуск функции импортаа
importMovies();
