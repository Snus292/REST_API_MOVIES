const express = require('express');
const router = express.Router();

// Импортируем все маршруты
const moviesRouter = require('./movies');
// const directorsRouter = require('./directors');
// const actorsRouter = require('./actors');

// Подключаем маршруты
router.use('/movies', moviesRouter);
// router.use('/directors', directorsRouter);
// router.use('/actors', actorsRouter);

module.exports = router;
