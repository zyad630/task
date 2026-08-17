const express = require('express');
const router = express.Router();

const { signup, login, updateUser, deleteUser, getUser } = require('./user.controller');
const auth = require('../../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.patch('/', auth, updateUser);
router.delete('/', auth, deleteUser);
router.get('/', auth, getUser);

module.exports = router;
