const router = require('express').Router();
const BookModel = require('../models/Books.js');
const cityController = require('../controllers/booksController.js');

router.get('/cities', cityController.index);
router.get('/cities/:cityId', cityController.show);
router.post('/cities', cityController.create);
router.put('/cities/:cityId', cityController.update);
router.delete('/cities/:cityId', cityController.delete);

module.exports = router;