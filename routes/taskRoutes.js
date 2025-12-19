const express = require('express');
const router = express.Router();
const { createTask } = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');
const { validateCreateTask } = require('../middleware/validation');

// POST /api/tasks - Create a new task (Protected)
router.post('/', authenticate, validateCreateTask, createTask);

module.exports = router;
