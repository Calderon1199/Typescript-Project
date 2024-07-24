const { body } = require('express-validator');

const validateListingImage = () => {
    return [
        body('listingId')
            .exists()
            .withMessage('Provide a listing ID'),
        body('userId')
            .exists()
            .withMessage('Provide a userId'),
        body('preview')
            .exists()
            .withMessage('Provide a preview image'),
        body('url')
            .exists()
            .withMessage('Provide image url')
    ]
};

module.exports = validateReviewImage;
