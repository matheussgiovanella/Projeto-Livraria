const router = require('express').Router();
const StateModel = require('../models/State.js');
const stateController = require('../controllers/statesController.js');

router.get('/users', stateController.index);
router.post('/users', stateController.create);
router.put('/users', stateController.update);
router.delete('/users', stateController.delete);

module.exports = router;