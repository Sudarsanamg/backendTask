const validator = require('validator');

const validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username || username.trim().length === 0) {
    errors.push('Username is required');
  } else if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  } else if (username.length > 30) {
    errors.push('Username must be less than 30 characters');
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length === 0) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  } else if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length === 0) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateCreateTask = (req, res, next) => {
  const { title, description, priority, dueDate, category, tags, estimatedHours } = req.body;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Task title is required');
  } else if (title.length < 3) {
    errors.push('Title must be at least 3 characters long');
  } else if (title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (description && description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }

  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    errors.push('Priority must be one of: low, medium, high');
  }

  if (dueDate) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      errors.push('Due date must be a valid date');
    } else if (date <= new Date()) {
      errors.push('Due date must be in the future');
    }
  }

  if (estimatedHours !== undefined) {
    if (typeof estimatedHours !== 'number' || estimatedHours < 0) {
      errors.push('Estimated hours must be a non-negative number');
    }
  }

  if (tags) {
    if (!Array.isArray(tags)) {
      errors.push('Tags must be an array');
    } else if (tags.some(tag => typeof tag !== 'string')) {
      errors.push('All tags must be strings');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateCreateCategory = (req, res, next) => {
  const { name, color } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Category name is required');
  } else if (name.length > 50) {
    errors.push('Category name must be less than 50 characters');
  }

  if (!color || color.trim().length === 0) {
    errors.push('Category color is required');
  } else if (!/^#([A-Fa-f0-9]{6})$/.test(color)) {
    errors.push('Color must be a valid hex color code (e.g., #3B82F6)');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = { validateRegistration, validateLogin, validateCreateTask, validateCreateCategory };
