const express = require('express');
const router = express.Router();
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const { authenticate } = require('../middleware/auth');
const { validateCreateCategory } = require('../middleware/validation');

router.get('/', authenticate, getCategories);
router.post('/', authenticate, validateCreateCategory, createCategory);
router.delete('/:id', authenticate, deleteCategory);

module.exports = router;
