const express = require('express');
const router = express.Router();
const { createTask, getTaskById } = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');
const { validateCreateTask } = require('../middleware/validation');

router.post('/', authenticate, validateCreateTask, createTask);
router.get('/:id', authenticate, getTaskById);

module.exports = router;
