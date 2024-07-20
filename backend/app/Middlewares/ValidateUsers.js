const { body } = require('express-validator');

const validateUser = () => {
    return [
        body('firstName')
            .isString()
            .withMessage('First name must be a string')
            .isAlpha()
            .withMessage('First name must contain letters only')
            .exists()
            .withMessage('Please provide a first name')
            .isLength({ min: 2 })
            .withMessage('First Name is must be at least 2 characters long')
            .isLength({ max: 50})
            .withMessage('Exceeds character limit'),
        body('lastName')
            .isString()
            .withMessage('Last name must be a string')
            .isAlpha()
            .withMessage('Last name must contain letters only')
            .exists()
            .withMessage('Please provide a last name')
            .isLength({ min: 2 })
            .withMessage('Last Name is must be at least 2 characters long')
            .isLength({ max: 50 })
            .withMessage('Exceeds character limit'),
        body('username')
            .isString()
            .withMessage('Username must be a string')
            .isLength({ min: 5 })
            .withMessage('Username must be at least 5 characters long')
            .isLength({ max: 50})
            .withMessage('Exceeds character limit'),
        body('email')
            .isEmail()
            .withMessage('Must be a valid email address'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .isLength({ max: 20 })
            .withMessage('Exceeds character limit'),
    ];
}

module.exports = validateUser;
