const router = require('express').Router();
const BookModel = require('../models/Books.js');
const bookController = require('../controllers/booksController.js');

router.get('/cities', bookController.index);
router.get('/cities/:cityId', bookController.show);
router.post('/cities', bookController.create);
router.put('/cities/:cityId', bookController.update);
router.delete('/cities/:cityId', bookController.delete);

module.exports = router;