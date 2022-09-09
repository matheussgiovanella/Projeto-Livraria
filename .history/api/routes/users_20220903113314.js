const router = require('express').Router();
const UserModel = require('../models/User.js');
const userController = require('../controllers/usersController.js');
const cors = require

router.get('/users', userController.index);
router.use()

module.exports = router;