const router = require('express').Router();
const userRouter = require('./users');

/* GET home page. */
router.use('/users', userRouter);

module.exports = router;
