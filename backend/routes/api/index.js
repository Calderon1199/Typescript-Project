const router = require('express').Router();
const { restoreUser } = require('../../utils/auth');
const listingRouter = require('./listings');
const userRouter = require('./users');

router.use(restoreUser);

router.use('/users', userRouter);
router.use('/listings', listingRouter);

module.exports = router;
