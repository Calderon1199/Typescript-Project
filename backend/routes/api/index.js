const router = require('express').Router();
const { restoreUser } = require('../../utils/auth');
const listingRouter = require('./listings');
const reviewRouter = require('./reviews');
const userRouter = require('./users');

router.use('/', restoreUser);

router.use('/users', userRouter);
router.use('/listings', listingRouter);
router.use('/reviews', reviewRouter);

module.exports = router;
