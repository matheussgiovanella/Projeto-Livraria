const router = require('express').Router();
const users = require('./users.js');
const states = require('./states.js');

router.use(users);
router.use(states);

module.exports = router;