const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const checkinsRouter = require('./checkin');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/checkins', checkinsRouter)


module.exports = router;
