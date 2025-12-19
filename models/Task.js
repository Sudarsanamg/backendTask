const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title must be less than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description must be less than 500 characters']
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: {
    type: [String],
    default: []
  },
  estimatedHours: {
    type: Number,
    min: [0, 'Estimated hours cannot be negative']
  }
}, {
  timestamps: true
});

// Method to return task object without sensitive fields
taskSchema.methods.toJSON = function() {
  const task = this.toObject();
  return {
    id: task._id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    user: task.user,
    createdAt: task.createdAt
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
