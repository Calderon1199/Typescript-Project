const router = require('express').Router();

const listingImageController = require('../../app/Controllers/ListingImageController');
const { requireAuth } = require('../../utils/auth');

router.post('/', listingImageController.listingImageStore);
router.get('/lists', listingImageController.listingImageList);
router.put('/:id', listingImageController.updateListingImage);


module.exports = router;
