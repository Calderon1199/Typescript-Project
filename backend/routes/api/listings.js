const router = require('express').Router();

const ListingController = require('../../app/Controllers/ListingController');
const { validateListing } = require('../../app/Middlewares/ValidateListings');
const { requireAuth } = require('../../utils/auth');
const validate = require('../../app/Middlewares');

router.post('/', requireAuth, validateListing(), validate, ListingController.listingStore);
router.get('/user', requireAuth, ListingController.userListings);
router.get('/all', ListingController.listingsLists);
router.get('/:id', ListingController.singleListing);
router.put('/:id', requireAuth, validateListing(), validate, ListingController.updateListing);
router.delete('/:id', requireAuth, ListingController.deleteListing);

module.exports = router;
