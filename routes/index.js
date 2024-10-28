const express = require('express');
const router = express.Router();

//импорт
const moviesRouter = require('./movies');
// const directorsRouter = require('./directors');
const actorsRouter = require('./actors');

// подкл
router.use('/movies', moviesRouter);
// router.use('/directors', directorsRouter);
router.use('/actors', actorsRouter);

module.exports = router;
