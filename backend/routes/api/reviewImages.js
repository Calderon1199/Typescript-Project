const router = require('express').Router();

const reviewImageController = require('../../app/Controllers/ReviewImageController');
const { requireAuth } = require('../../utils/auth');

router.post('/', reviewImageController.reviewImageStore);
router.get('/lists', reviewImageController.reviewImageList);
router.put('/:id', reviewImageController.updateReviewImage);


module.exports = router;
