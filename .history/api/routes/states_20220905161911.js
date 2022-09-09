const router = require('express').Router();
const StateModel = require('../models/State.js');
const stateController = require('../controllers/statesController.js');

router.get('/states', stateController.index);
router.post('/states', stateController.create);
router.put('/states/:stateID', stateController.update);
//router.delete('/states', stateController.delete);

module.exports = router;