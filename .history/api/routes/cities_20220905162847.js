const router = require('express').Router();
const CityModel = require('../models/City.js');
const cityController = require('../controllers/citiesController.js');

router.get('/states', stateController.index);
router.get('/states/:stateId', stateController.show);
router.post('/states', stateController.create);
router.put('/states/:stateId', stateController.update);
router.delete('/states/:stateId', stateController.delete);

module.exports = router;