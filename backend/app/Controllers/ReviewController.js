const Review = require('../Models/Review');


module.exports = {
    reviewStore: async (req, res, next) => {
        try {
            const { userId, listingId, reviewText, stars } = req.body;

            const reviewData = {
                userId,
                listingId,
                reviewText: reviewText.trim(),
                stars
            }


            const review = new Review(reviewData);
            const reviewId = await review.addReview();
            const newReview = await Review.getReviewById(reviewId);

            res.status(201).json({
                message: 'Review created successfully',
                data: newReview
            })
        } catch (err) {
            next(err)
        }
    },

    reviewLists: async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const offset = parseInt(req.query.offset) || 0;
            const reviews = await Review.getAllReviews(limit, offset);

            res.status(200).json({
                data: reviews,
                metadata: {
                    limit,
                    offset,
                    total: reviews.length
                }
            })
        } catch (err) {
            next(err)
        }
    },

    updateReview: async (req, res, next) => {
        try {
            const { reviewText, stars } = req.body;
            const id = req.params.id;

            const reviewData = {
                reviewText: reviewText.trim(),
                stars
            }

            const review = new Review(reviewData);
            await review.updateReview(id);
            const updatedReview = await Review.getReviewById(id);

            res.status(200).json({
                message: 'Review updated successfully',
                data: updatedReview
            })

        } catch (err) {
            next(err)
        }
    },

    deleteReview: async (req, res, next) => {
        try {
            const {id} = req.params;

            const reviewToDelete = await Review.getReviewById(id);

            if (reviewToDelete) {
                await Review.deleteReviewById(id);

                res.status(200).json({ message: 'Review deleted successfully'});
            } else {
                res.status(404).json({ message: 'Review not found'})
            }
        } catch (err) {
            next(err)
        }
    }
}

