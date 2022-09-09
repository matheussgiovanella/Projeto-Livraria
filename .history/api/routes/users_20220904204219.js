const router = require('express').Router();
const UserModel = require('../models/User.js');
const userController = require('../controllers/usersController.js');

const validateUserId = async (req, res, next) => {
    const user = await UserModel.findByPk(req.params.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    next();
}

router.get('/users', userController.index);
router.post('/users', userController.create);
router.put('/users/', userController.update);
router.delete('/users', userController.delete);

module.exports = router;