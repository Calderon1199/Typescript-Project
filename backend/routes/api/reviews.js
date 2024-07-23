const router = require('express').Router();

const reviewController = require('../../app/Controllers/ReviewController');
const { requireAuth } = require('../../utils/auth');

router.post('/', reviewController.reviewStore);
router.get('/lists', reviewController.reviewLists);
router.put('/:id', reviewController.updateReview);


module.exports = router;
