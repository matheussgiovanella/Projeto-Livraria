const router = require('express').Router();
const UserModel = require('../models/User.js');
const userController = require('../controllers/usersController.js');
const cors = require('cors')

router.get('/users', userController.index);
router.use(cors());

module.exports = router;