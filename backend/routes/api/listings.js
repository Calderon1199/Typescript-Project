const router = require('express').Router();

const ListingController = require('../../app/Controllers/ListingController');
const { requireAuth } = require('../../utils/auth');


router.post('/', ListingController.listingStore);
router.get('/lists', ListingController.listingsLists);
router.put('/:id', ListingController.updateListing);

module.exports = router;
