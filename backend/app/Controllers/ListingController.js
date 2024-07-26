const {validateAddress} = require('../Middlewares/ValidateListings');
const Listing = require('../Models/Listing');

module.exports = {
    listingStore: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { price, zipcode, city, name, state, street, country, description } = req.body;

            const listingData = {
                price,
                userId,
                zipcode,
                city: city.trim(),
                name: name.trim(),
                state: state.trim(),
                street: street.trim(),
                country: country.trim(),
                description: description.trim()
            };

            const validationResponse = await validateAddress(street, city, state, zipcode);

            if (validationResponse > 0) {
                const listing = new Listing(listingData);
                const listingId = await listing.addListing();
                const newListing = await Listing.getListingById(listingId);

                return res.status(201).json({
                    message: 'Listing created successfully',
                    data: newListing
                });
            } else {
                return res.status(422).json({ message: 'Address validation failed' });
            };

        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Address already exists.' });
            };
            next(err);
        };
    },

    userListings: async (req, res, next) => {
        try {
            const {id} = req.user;
            const userListings = await Listing.getUserListings(id);

            if (!userListings.length) {
                return res.status(200).json({ message: 'No owned listings' });
            } else {
                res.status(200).json({ userListings });
            };

        } catch (err) {
            next(err);
        }
    },

    singleListing: async (req, res, next) => {
        try {
            const {id} = req.params;
            const singleListing = await Listing.getListingById(id);

            if (!singleListing) {
                return res.status(404).json({ message: 'Listing not found'});
            } else {
                return res.status(200).json({
                    listing: singleListing
                });
            };
        } catch (err) {
            next(err);
        }
    },

    listingsLists: async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit, 10) || 10;
            const offset = parseInt(req.query.offset, 10) || 0;
            const listings = await Listing.getAllListings(limit, offset);

            if (!listings.length) return res.status(200).json({message: 'No listings found'});

            return res.status(200).json({
                allListings: listings,
                metadata: {
                    limit,
                    offset,
                    total: listings.length
                }
            });

        } catch (err) {
            next(err);
        };
    },

    updateListing: async (req, res, next) => {
        try {
            const {street, city, state, zipcode, ...updatedData} = req.body;
            const {id} = req.params;
            const userId = req.user.id;

            const existingListing = await Listing.getListingById(id);

            if (!existingListing) {
                return res.status(404).json({ message: 'Listing not found.' });
            };
            if (existingListing.userId !== userId) {
                return res.status(401).json({ message: 'Forbidden' });
            };

            const validationResponse = await validateAddress(street, city, state, zipcode);

            if (validationResponse > 0) {
                const newData = { ...existingListing, ...updatedData, street, city, state, zipcode };
                const listing = new Listing(newData);
                await listing.updateListing(id);
                const updatedListing = await Listing.getListingById(id);

                return res.status(200).json({
                    message: 'Listing updated successfully.',
                    data: updatedListing
                });
            } else {
                return res.status(422).json({ message: 'Address validation failed' });
            };
        } catch (err) {
            next(err);
        };
    },

    deleteListing: async (req, res, next) => {
        try {
            const {id} = req.params;
            const listingToDelete = await Listing.getListingById(+id);

            if (!listingToDelete) return res.status(404).json({ message: 'Listing not found.' });
            if (listingToDelete.userId !== req.user.id) return res.status(401).json({ message: 'Forbidden'});

            await Listing.deleteListingById(id);
            return res.status(200).json({ message: 'Listing deleted successfully.'});

        } catch (err) {
            next(err);
        };
    }
};
