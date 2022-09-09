const router = require('express').Router();
const LogModel = require('../models/Log.js');
const logController = require('../controllers/logsController.js');

router.get('/logs', logController.index);
router.get('/logs/:logId', logController.show);
router.post('/logs', logController.create);
router.put('/logs/:logId', logController.update);
router.delete('/logs/:logId', logController.delete);

module.exports = router;