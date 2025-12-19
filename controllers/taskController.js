const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, category, tags, estimatedHours } = req.body;
    const userId = req.user.userId;

    // Create task
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      category,
      tags: tags || [],
      estimatedHours,
      user: userId,
      status: 'todo'
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        task: task.toJSON()
      }
    });
  } catch (error) {
    console.error('Task creation error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during task creation',
      error: error.message
    });
  }
};

module.exports = {
  createTask
};
