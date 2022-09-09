const router = require('express').Router();
const StateModel = require('../models/State.js');
const userController = require('../controllers/statesController.js');

router.get('/users', userController.index);
router.post('/users', userController.create);
router.put('/users/', userController.update);
router.delete('/users', userController.delete);

module.exports = router;