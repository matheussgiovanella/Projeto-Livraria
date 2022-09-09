const router = require('express').Router();
const users = require('./users.js');
const states = require('./states.js');
const cities = require('./cities.js');
const publishers = require('./publishers.js');

router.use(users);
router.use(states);
router.use(cities);
router.use(publishers);

module.exports = router;