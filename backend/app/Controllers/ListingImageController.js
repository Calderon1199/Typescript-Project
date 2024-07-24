const ListingImage = require('../Models/ListingImage');

module.exports = {
    listingImageStore: async (req, res, next) => {
        try {
            const { listingId, url, preview } = req.body;

            const listingImageData = {
                preview,
                listingId,
                url: url.trim()
            };

            const listingImage = new ListingImage(listingImageData);
            const id = await listingImage.addListingImage();
            const newListingImage = await ListingImage.getListingImageById(id);

            res.status(201).json({
                message: 'Listing image uploaded successfully',
                data: newListingImage
            });
        } catch (err) {
            next(err);
        };
    },

    listingImageList: async (req, res, next) => {
        try {
            const listingImages = await ListingImage.getAllListingImages();

            res.status(200).json({
                data: listingImages
            });

        } catch (err) {
            next(err);
        };
    },

    updateListingImage: async (req, res, next) => {
        try {
            const {url, preview} = req.body;
            const id = req.params.id;

            const listingImageData = { url: url.trim(), preview };

            const listingImage = new ListingImage(listingImageData);
            await listingImage.updateListingImage();
            const updateListingImage = await ListingImage.getListingImageById(id);

            res.status(200).json({
                message: "Image updated successfully",
                data: updateListingImage
            });
        } catch (err) {
            next(err);
        };
    },

    deleteListingImage: async (req, res, next) => {
        try {
            const {id} = req.params;
            const listingImageToDelete = await ListingImage.getListingImageById(id);

            if (listingImageToDelete) {
                await ListingImage.deleteListingImageById(id);
                res.status(200).json({ message: 'Image successfully deleted'});
            } else {
                res.status(404).json({ message: 'Image not found'});
            };
        } catch (err) {
            next(err);
        };
    }
};
