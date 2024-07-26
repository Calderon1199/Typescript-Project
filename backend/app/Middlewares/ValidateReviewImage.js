const { body } = require('express-validator');

const validateReviewImage = () => {
    return [
        body('reviewId')
            .exists()
            .withMessage('Provide a review ID'),
        body('url')
            .exists()
            .trim()
            .withMessage('Provide image url')
            .bail()
            .notEmpty()
            .withMessage('Provide an image')
    ]
};

module.exports = validateReviewImage;
