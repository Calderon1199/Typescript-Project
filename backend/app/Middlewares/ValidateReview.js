const { body } = require('express-validator');


const validateReview = () => {
    return [
        body('userId')
            .exists()
            .withMessage('Provide User ID'),
        body('listingId')
            .exists()
            .withMessage('Provide listing ID'),
        body('reviewText')
            .exists()
            .withMessage('Please provide a review'),
        body('stars')
            .exists()
            .withMessage('Please provide a star rating')
    ]
};

module.exports = validateReview;
