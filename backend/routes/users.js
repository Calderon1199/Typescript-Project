const express = require('express');
const router = express.Router();
const UserController = require('../app/Controllers/UserController');

/* GET users listing. */
router.post('/', UserController.userStore);
router.get('/lists', UserController.usersLists);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/:id', UserController.getUserById);

module.exports = router;
