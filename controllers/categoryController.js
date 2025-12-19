const Category = require('../models/Category');
const Task = require('../models/Task');

const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    const userId = req.user.userId;

    const category = await Category.create({
      name,
      color,
      user: userId
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: {
        category: {
          id: category._id,
          name: category.name,
          color: category.color,
          createdAt: category.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Category creation error:', error);

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
      message: 'Server error during category creation',
      error: error.message
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const userId = req.user.userId;

    const categories = await Category.find({ user: userId }).sort({ createdAt: -1 });

    const formattedCategories = categories.map(cat => ({
      id: cat._id,
      name: cat.name,
      color: cat.color,
      createdAt: cat.createdAt
    }));

    res.status(200).json({
      success: true,
      data: {
        categories: formattedCategories,
        total: formattedCategories.length
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving categories',
      error: error.message
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const category = await Category.findOne({ _id: id, user: userId });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found or you do not have permission to delete it'
      });
    }

    // Set category to null for all tasks in this category
    await Task.updateMany({ category: id, user: userId }, { $set: { category: null } });

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting category',
      error: error.message
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory
};
