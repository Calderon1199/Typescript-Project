const ReviewImage = require('../Models/ReviewImage');


module.exports = {
    reviewImageStore: async (req, res, next) => {
        try {
            const { reviewId, url } = req.body;

            const reviewImageData = { reviewId, url: url.trim() };

            const reviewImage = new ReviewImage(reviewImageData);
            const id = await reviewImage.addReviewImage();
            const newReviewImage = await ReviewImage.getReviewImageById(id);

            res.status(201).json({
                message: 'Review Image uploaded successfully',
                data: newReviewImage
            });
        } catch (err) {
            next(err);
        };
    },

    reviewImageList: async (req, res, next) => {
        try {
            const reviewImages = await ReviewImage.getAllReviewImages();
            res.status(200).json({ data: reviewImages });
            
        } catch (err) {
            next(err);
        };
    },

    updateReviewImage: async (req, res, next) => {
        try {
            const {url} = req.body;
            const id = req.params.id;

            const reviewImageData = {url: url.trim()};

            const reviewImage = new ReviewImage(reviewImageData);
            await reviewImage.updateReviewImage(id);
            const updatedReviewImage = await ReviewImage.getReviewImageById(id);

            res.status(200).json({
                message: 'Image updated successfully',
                data: updatedReviewImage
            });
        } catch (err) {
            next(err);
        };
    },

    deleteReviewImage: async (req, res, next) => {
        try {
            const {id} = req.params;
            const reviewImgToDelete = await ReviewImage.getReviewImageById(id);

            if (reviewImgToDelete) {
                await ReviewImage.deleteReviewImageById(id);
                res.status(200).json({ message: 'Image successfully deleted' });
            } else {
                res.status(404).json({ message: 'Image not found'});
            };

        } catch (err) {
            next(err);
        };
    }
}
