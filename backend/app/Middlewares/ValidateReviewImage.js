const { body } = require('express-validator');

const validateReviewImage = () => {
    return [
        body('reviewId')
            .exists()
            .withMessage('Provide a review ID'),
        body('url')
            .exists()
            .withMessage('Provide image url')
    ]
};

module.exports = validateReviewImage;
