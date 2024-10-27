const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Импортируем основной файл маршрутов

const app = express();
app.use(bodyParser.json());

// Используем основной файл маршрутов
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
