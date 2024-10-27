const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

router.post('/', actorsController.createActor);
router.get('/', actorsController.getActors);
router.get('/:id', actorsController.getActorById);
// router.get('/:Title', actorsController.getActorByTitle);

module.exports = router;