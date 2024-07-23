const { body } = require('express-validator');
const axios = require('axios');


const validateListing = () => {
    return [
        body('userId')
            .exists()
            .withMessage('Provide a valid user ID')
            .isNumeric()
            .withMessage('User ID must be a number'),
        body('street')
            .exists()
            .withMessage('Provide a street address')
            .isString()
            .withMessage('Street address must be a string')
            .trim()
            .notEmpty()
            .withMessage('Street address cannot be empty')
            .isLength({ max: 100 })
            .withMessage('Street address cannot be longer than 100 characters'),
        body('city')
            .exists()
            .withMessage('Provide a city')
            .isString()
            .withMessage('City must be a string')
            .trim()
            .notEmpty()
            .withMessage('City cannot be empty')
            .isLength({ max: 60 })
            .withMessage('City cannot be longer than 60 characters'),
        body('state')
            .exists()
            .withMessage('Provide a state')
            .isLength({ min: 2, max: 2 })
            .withMessage('State abbreviation must be exactly 2 characters long')
            .isAlpha()
            .withMessage('State abbreviation must contain only letters'),
        body('zipcode')
            .exists()
            .withMessage('Provide a zipcode')
            .isString()
            .withMessage('Zipcode must be a string')
            .trim()
            .notEmpty()
            .withMessage('Zipcode cannot be empty')
            .matches(/^\d{5}(-\d{4})?$/)
            .withMessage('Zipcode must be in the format 12345 or 12345-6789'),
        body('country')
            .exists()
            .withMessage('Provide a country')
            .isString()
            .withMessage('Country must be a string')
            .trim()
            .notEmpty()
            .withMessage('Country cannot be empty')
            .isLength({ max: 100 })
            .withMessage('Country cannot be longer than 100 characters'),
        body('name')
            .exists()
            .withMessage('Provide a listing name')
            .isString()
            .withMessage('Listing name must be a string')
            .trim()
            .notEmpty()
            .withMessage('Listing name cannot be empty')
            .isLength({ max: 100 })
            .withMessage('Listing name cannot be longer than 100 characters'),
        body('description')
            .exists()
            .withMessage('Provide a description')
            .isString()
            .withMessage('Description must be a string')
            .trim()
            .notEmpty()
            .withMessage('Description cannot be empty'),
        body('price')
            .exists()
            .withMessage('Provide a price')
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number')
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
    }

}


module.exports = {
    validateListing,
    validateAddress
};
