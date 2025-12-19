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

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    // Validate status
    const validStatuses = ['todo', 'in-progress', 'completed', 'archived'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: todo, in-progress, completed, archived'
      });
    }

    const task = await Task.findOne({ _id: id, user: userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have permission to update it'
      });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task status updated successfully',
      data: {
        task: {
          id: task._id,
          status: task.status
        }
      }
    });
  } catch (error) {
    console.error('Update task status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating task status',
      error: error.message
    });
  }
};

const updateTaskPriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;
    const userId = req.user.userId;

    // Validate priority
    const validPriorities = ['low', 'medium', 'high'];
    if (!priority || !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority. Must be one of: low, medium, high'
      });
    }

    const task = await Task.findOne({ _id: id, user: userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have permission to update it'
      });
    }

    task.priority = priority;
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task priority updated successfully',
      data: {
        task: {
          id: task._id,
          priority: task.priority
        }
      }
    });
  } catch (error) {
    console.error('Update task priority error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating task priority',
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getTaskById,
  updateTaskStatus,
  updateTaskPriority
};
