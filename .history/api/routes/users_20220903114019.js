const router = require('express').Router();
const UserModel = require('../models/User.js');
const userController = require('../controllers/usersController.js');

router.get('/users', userController.index);

module.exports = router;