const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create Task
router.post('/', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({
        title,
        description,
        user: req.user.id
    });

    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error('Error saving task:', err);
        res.status(400).json({ message: 'Failed to create task' });
    }
});

// Get All Tasks
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json(err);
    }
});

// Delete Task by ID


// Delete Task by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
      const taskId = req.params.id;
      const task = await Task.findOneAndDelete({ _id: taskId, user: req.user.id });

      if (!task) {
          return res.status(404).json({ message: 'Task not found' });  // Handle case where task doesn't exist
      }

      res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
      console.error('Error deleting task:', err);
      res.status(500).json({ message: 'Server error while deleting task' });
  }
});

// Update Task by ID
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  try {
      const updatedTask = await Task.findOneAndUpdate(
          { _id: req.params.id, user: req.user.id },  // Ensure the task belongs to the user
          { title, description },
          { new: true }  // Return the updated document
      );

      if (!updatedTask) {
          return res.status(404).json({ message: 'Task not found' });
      }

      res.json(updatedTask);
  } catch (err) {
      console.error('Error updating task:', err);
      res.status(500).json({ message: 'Failed to update task' });
  }
});



module.exports = router;
