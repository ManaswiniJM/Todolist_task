const Task = require('../modules/Task');

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;
    const task = new Task({
      userId: req.user.userId,
      title,
      description,
      dueDate,
      category
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks (with filters)
exports.getTasks = async (req, res) => {
  try {
    const { status, category, dueDate, sort } = req.query;
    let query = { userId: req.user.userId };
    if (status) query.status = status;
    if (category) query.category = category;
    if (dueDate) query.dueDate = { $gte: new Date(dueDate) };
    let tasks = Task.find(query);
    if (sort) tasks = tasks.sort({ dueDate: sort === 'desc' ? -1 : 1 });
    res.json(await tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      userId: req.user.userId
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.taskId, userId: req.user.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.taskId,
      userId: req.user.userId
    });
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark completed (atomic)
exports.markCompleted = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.taskId, userId: req.user.userId },
      { status: 'completed', updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark pending (atomic)
exports.markPending = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.taskId, userId: req.user.userId },
      { status: 'pending', updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get tasks by category
exports.getTasksByCategory = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.userId,
      category: req.params.category
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search by title or description
exports.searchTasks = async (req, res) => {
  try {
    const { q } = req.query;
    const tasks = await Task.find({
      userId: req.user.userId,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
