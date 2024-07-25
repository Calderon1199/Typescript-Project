const { body } = require('express-validator');
const axios = require('axios');


const validateListing = () => {
    return [
        body('userId')
            .exists()
            .withMessage('Provide a userId')
            .bail()
            .isNumeric()
            .withMessage('User ID must be a number'),
        body('street')
            .exists()
            .withMessage('Provide a street address')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Street address cannot be empty')
            .bail()
            .isString()
            .withMessage('Street address must be a string')
            .bail()
            .isLength({ max: 100 })
            .withMessage('Street address cannot be longer than 100 characters'),
        body('city')
            .exists()
            .withMessage('Provide a city')
            .bail()
            .isString()
            .withMessage('City must be a string')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('City cannot be empty')
            .bail()
            .isLength({ max: 60 })
            .withMessage('City cannot be longer than 60 characters'),
        body('state')
            .exists()
            .withMessage('Provide a state')
            .bail()
            .isLength({ min: 2, max: 2 })
            .withMessage('State abbreviation must be exactly 2 characters long')
            .bail()
            .isAlpha()
            .withMessage('State abbreviation must contain only letters'),
        body('zipcode')
            .exists()
            .withMessage('Provide a zipcode')
            .bail()
            .notEmpty()
            .withMessage('Zipcode cannot be empty')
            .bail()
            .matches(/^\d{5}(-\d{4})?$/)
            .withMessage('Zipcode must be in the format 12345 or 12345-6789'),
        body('country')
            .exists()
            .withMessage('Provide a country')
            .bail()
            .isString()
            .withMessage('Country must be a string')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Country cannot be empty')
            .bail()
            .isLength({ max: 100 })
            .withMessage('Country cannot be longer than 100 characters'),
        body('name')
            .exists()
            .withMessage('Provide a listing name')
            .bail()
            .isString()
            .withMessage('Listing name must be a string')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Listing name cannot be empty')
            .bail()
            .isLength({ max: 100 })
            .withMessage('Listing name cannot be longer than 100 characters'),
        body('description')
            .exists()
            .withMessage('Provide a description')
            .bail()
            .isString()
            .withMessage('Description must be a string')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Description cannot be empty'),
        body('price')
            .exists()
            .withMessage('Provide a price')
            .bail()
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number'),
    ];
};


const validateAddress = async(street, city, state, zipcode) => {
    const authId = process.env.SMARTY_STREETS_AUTH_ID;
    const authToken = process.env.SMARTY_STREETS_AUTH_TOKEN;
    const license = process.env.SMARTY_STREETS_LICENSE;

    const url = `https://us-street.api.smarty.com/street-address?auth-id=${authId}&auth-token=${authToken}&license=${license}&street=${encodeURIComponent(street)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&zipcode=${encodeURIComponent(zipcode)}&match=strict`;

    try {
        const response = await axios.get(url);
        return response.data.length;
    } catch (error) {
        console.error(error);
        throw new Error('Error validating address');
    };

};


module.exports = {
    validateListing,
    validateAddress
};
