const Task = require('../models/Task');
const Category = require('../models/Category');

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

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const task = await Task.findOne({ _id: id, user: userId }).populate('category', 'name color');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have permission to view it'
      });
    }

    const taskObj = task.toJSON();
    if (task.category) {
      taskObj.category = {
        id: task.category._id,
        name: task.category.name,
        color: task.category.color
      };
    }

    res.status(200).json({
      success: true,
      data: {
        task: taskObj
      }
    });
  } catch (error) {
    console.error('Get task by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving task',
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getTaskById
};
