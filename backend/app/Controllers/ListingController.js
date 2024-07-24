const {validateAddress} = require('../Middlewares/ValidateListings');
const Listing = require('../Models/Listing');

module.exports = {
    listingStore: async (req, res, next) => {
        try {
            const { userId, street, city, zipcode, state, country, name, description, price } = req.body;

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
            }
            next(err);
        };
    },

    listingsLists: async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit, 10) || 10;
            const offset = parseInt(req.query.offset, 10) || 0;
            const listings = await Listing.getAllListings(limit, offset);

            return res.status(200).json({
                data: listings,
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
            const { street, city, zipcode, state, country, name, description, price } = req.body;
            const id = req.params.id;

            const existingListing = await Listing.getListingById(id);

            if (!existingListing) {
                return res.status(404).json({ message: 'Listing not found.' });
            }

            const validationResponse = await validateAddress(street, city, state, zipcode);

            if (validationResponse > 0) {
                const updatedData = {
                    price,
                    zipcode,
                    name: name.trim(),
                    city: city.trim(),
                    state: state.trim(),
                    street: street.trim(),
                    country: country.trim(),
                    description: description.trim(),
                };

                const listing = new Listing({ ...existingListing, ...updatedData });
                await listing.updateListing();

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

            const listingToDelete = await Listing.getListingById(id);

            if (listingToDelete) {
                await Listing.deleteListingById(id);

                res.status(200).json({ message: 'Listing deleted successfully.'});
            } else {
                res.status(404).json({ message: 'Listing not found.'});
            }
        } catch (err) {
            next(err);
        };
    }
};
