const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const checkinsRouter = require('./checkins');
const drinksRouter = require('./drinks')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/checkins', checkinsRouter);
router.use('/drinks', drinksRouter);


module.exports = router;
