const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, logout } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', authenticate, logout);

module.exports = router;
