const router = require('express').Router();

const reviewImageController = require('../../app/Controllers/ReviewImageController');
const { requireAuth } = require('../../utils/auth');

router.post('/', requireAuth, reviewImageController.reviewImageStore);
router.get('/all', reviewImageController.reviewImageList);
router.put('/:id', requireAuth, reviewImageController.updateReviewImage);
router.delete('/:id', requireAuth, reviewImageController.deleteReviewImage);


module.exports = router;
