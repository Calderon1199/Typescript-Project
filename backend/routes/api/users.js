const express = require('express');
const router = express.Router();
const UserController = require('../../app/Controllers/UserController');
const validateUser = require('../../app/Middlewares/ValidateUsers');
const validate = require('../../app/Middlewares');
const { requireAuth } = require('../../utils/auth');

/* GET users listing. */
router.post('/', validateUser(), validate, UserController.userStore);
router.post('/login', validate, UserController.userLogin);
router.get('/all', requireAuth, UserController.usersLists);
router.get('/:id', requireAuth, UserController.getUserById);
router.put('/:id', validateUser(), validate, UserController.updateUser);
router.delete('/logout', validate, UserController.userLogout);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
