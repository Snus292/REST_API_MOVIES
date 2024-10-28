const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Movie, Genre, Director, Actor } = require('./models'); // Импорт всех необходимых моделей

//путь к CSV файлу
const csvFilePath = path.join(__dirname, 'movies_imdb.csv'); 

//функция для импорта данных
const importMovies = async () => {
  try {
    const moviesData = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv()) // обработка через парсер, для перестройки строк в Обьекты
      .on('data', (row) => { // подписка на событие data для обработки каждой строки
        moviesData.push(row); //при обработке каждой строки (в виде объекта row) добавл в массив
      })
      .on('end', async () => {
        console.log('CSV прочитан. Импорт в БД...');

        for (const movieRow of moviesData) { //перебор каждог объекта movieRow в массиве moviesData
          //найти или создать режиссера
          const [director, createdDirector] = await Director.findOrCreate({
            where: { name: movieRow.Director.trim() }
          });                            //trim() удаляет лишние пробелы.

          
          //фильм с  полями
          const movie = await Movie.create({
            title: movieRow.Name.trim(),          
            release_year: parseInt(movieRow.Year), 
            run_time: parseInt(movieRow.Run_time), 
            rating: parseFloat(movieRow.Rating),   
            meta_score: parseFloat(movieRow.Meta_score),
            votes: parseInt(movieRow.Votes),       
            gross: parseFloat(movieRow.Gross),
            directorId: director.id                
          });

          //обработка жанров. //split(',') делит строку movieRow.Genre на массив жанров
          const genresNames = movieRow.Genre.split(',').map(genre => genre.trim());
          for (const genreName of genresNames) {               //trim() удаляет лишние пробелы.
            const [genre, createdGenre] = await Genre.findOrCreate({
              where: { name: genreName }
            });
            await movie.addGenre(genre);  //связ "многие ко многим" между фильмом и жанром
          }

          //обработка актеров
          const actorsNames = movieRow.Cast.split(',').map(actor => actor.trim());
          for (const actorName of actorsNames) {
                  //обьект , логическое значение
            const [actor, createdActor] = await Actor.findOrCreate({
              where: { name: actorName }
            });
            await movie.addActor(actor);  //связ "многие ко многим" между фильмом и актерами
          }

          console.log(`Фильм "${movieRow.Name}" добавлен в базу данных.`);
        }

        console.log('импорт данных завершен.');
      });
  } catch (error) {
    console.error('Ошибка импорта данных:', error);
  }
};


importMovies();
