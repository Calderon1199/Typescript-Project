const router = require('express').Router();

const reviewController = require('../../app/Controllers/ReviewController');
const validate = require('../../app/Middlewares');
const validateReview = require('../../app/Middlewares/ValidateReview');
const { requireAuth } = require('../../utils/auth');

router.post('/', requireAuth, validateReview(), validate, reviewController.reviewStore);
router.get('/user', requireAuth, reviewController.userReviews);
router.get('/all', reviewController.reviewLists);
router.put('/:id', requireAuth, validateReview(), validate, reviewController.updateReview);
router.delete('/:id', requireAuth, reviewController.deleteReview);


module.exports = router;
