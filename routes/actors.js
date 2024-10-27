const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

router.post('/', actorsController.createActor);

module.exports = router;