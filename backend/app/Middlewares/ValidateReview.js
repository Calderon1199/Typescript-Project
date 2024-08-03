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
            .trim()
            .withMessage('Please provide a review')
            .bail()
            .notEmpty()
            .withMessage('Please provide a review'),
        body('stars')
            .exists()
            .withMessage('Please provide a star rating')
            .bail()
            .isIn([ 1,2,3 ])
            .withMessage('Please pick between 1-3 stars')
    ]
};

module.exports = validateReview;
