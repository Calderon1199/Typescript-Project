const { body } = require('express-validator');

const validateUser = () => {
    return [
        body('fullName')
            .trim()
            .isString()
            .withMessage('Name must be a string')
            .notEmpty()
            .withMessage('Please provide your full name')
            .isLength({ max: 100})
            .withMessage('Exceeds character limit'),
        body('username')
            .trim()
            .isString()
            .withMessage('Username must be a string')
            .notEmpty()
            .withMessage('Please provide a username')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters long')
            .isAlphanumeric()
            .withMessage('Username can only contain letters and numbers')
            .isLength({ max: 50})
            .withMessage('Exceeds character limit'),
        body('email')
            .trim()
            .notEmpty()
            .withMessage('Please provide an email')
            .isEmail()
            .withMessage('Must be a valid email address'),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .isLength({ max: 255 })
            .withMessage('Exceeds character limit'),
    ];
};

module.exports = validateUser;
