const { setTokenCookie } = require('../../utils/auth');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

module.exports = {
    userStore: async (req, res, next) => {
        try {
            const { email, fullName, username, password } = req.body;

            const userData = {
                email: email.trim(),
                fullName: fullName.trim(),
                username: username.trim(),
                password: password
            };

            const user = new User(userData);
            const userId = await user.addUser();
            const newUser = await User.getUserById(userId);

            await setTokenCookie(res, newUser);

            return res.status(201).json({
                message: 'User created successfully',
                user: newUser,
            });

        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Email or username already exists.' });
            }
            next(err);
        };
    },

    usersLists: async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const offset = parseInt(req.query.offset) || 0;
            const users = await User.getAllUsers(limit, offset);

            return res.status(200).json({
                users: users,
                metadata: {
                    limit,
                    offset,
                    total: users.length
                }
            });


        } catch (err) {
            next(err);
        };
    },

    updateUser: async (req, res, next) => {
        try {
            const { username } = req.body;
            const {id} = req.params;
            const userData = { username: username.trim()};

            const user = new User(userData);
            await user.updateUser(id);
            const updatedUser = await User.getUserById(id);

            return res.status(200).json({
                message: 'User updated successfully.',
                user: updatedUser,
            });
        } catch (err) {
            next(err);
        };
    },

    getUserById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.getUserById(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            };

            return res.status(200).json({
                user: user,
            });
        } catch (err) {
            next(err);
        };
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            await User.deleteUserById(id);

            return res.status(200).json({
                message: 'User deleted successfully.',
            });
        } catch (err) {
            if (err.message === 'User not found') {
                return res.status(404).json({ error: 'User not found' });
            }
            next(err);
        };
    },


    // LOGIN & LOGOUT METHODS

    userLogin: async (req, res, next) => {
        try {
            const { credential, password } = req.body;
            const user = await User.authenticate(credential, password);

            if (user) {
                await setTokenCookie(res, user);

                return res.status(200).json({
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        fullName: user.fullName,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.status(401).json({ error: 'Invalid credential or password' });
            };
        } catch (err) {
            next(err);
        };
    },

    userLogout: async (_req, res, next) => {
        try {
            res.clearCookie('token');
            return res.json({ message: 'success' });
        } catch (err) {
            return res.status(500).json({ message: 'Please try again.'});
        };
    }
};
