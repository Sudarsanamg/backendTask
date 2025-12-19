const express = require('express');
const router = express.Router();
const { createTask, getTaskById, updateTaskStatus, updateTaskPriority, updateTask, deleteTask, getTasks } = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');
const { validateCreateTask, validateGetTasksQuery } = require('../middleware/validation');

router.post('/', authenticate, validateCreateTask, createTask);
router.get('/', authenticate, validateGetTasksQuery, getTasks);
router.get('/:id', authenticate, getTaskById);
router.put('/:id', authenticate, updateTask);
router.put('/:id/status', authenticate, updateTaskStatus);
router.put('/:id/priority', authenticate, updateTaskPriority);
router.delete('/:id', authenticate, deleteTask);

module.exports = router;
