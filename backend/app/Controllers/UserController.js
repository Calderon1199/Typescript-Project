const { pool } = require('../../migration');
const User = require('../Models/User');

module.exports = {
    userStore: async (req, res, next) => {
        try {
            const { firstName, lastName, email, username, password } = req.body;

            // Basic input validation
            if (!firstName || !lastName || !email || !username || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const userData = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                username: username.trim(),
                password: password,
            };

            const user = new User(userData);
            const userId = await user.addUser();
            const newUser = await User.getUserById(userId);

            res.status(201).json({
                message: 'User created successfully',
                data: newUser,
            });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Email or username already exists.' });
            }
            next(err);
        }
    },

    usersLists: async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const offset = parseInt(req.query.offset) || 0;
            const users = await User.getAllUsers(limit, offset);

            res.status(200).json({
                data: users,
                metadata: {
                    limit,
                    offset,
                    total: users.length
                }
            });
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { firstName, lastName, username, email } = req.body;
            const id = req.params.id;

            // Basic input validation
            if (!firstName || !lastName || !username || !email) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const userData = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                username: username.trim(),
                email: email.trim(),
            };

            const user = new User(userData);
            await user.updateUser(id);
            const updatedUser = await User.getUserById(id);

            res.status(200).json({
                message: 'User updated successfully.',
                data: updatedUser,
            });
        } catch (err) {
            next(err);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await User.getUserById(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({
                data: user,
            });
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            await User.deleteUserById(id);

            res.status(200).json({
                message: 'User deleted successfully.',
            });
        } catch (err) {
            if (err.message === 'User not found') {
                return res.status(404).json({ error: 'User not found' });
            }
            next(err);
        }
    }
};
