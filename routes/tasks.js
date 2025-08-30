const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

// All routes are protected
router.use(authMiddleware);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/search', taskController.searchTasks);
router.get('/category/:category', taskController.getTasksByCategory);
router.get('/:taskId', taskController.getTaskById);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

router.post('/:taskId/markCompleted', taskController.markCompleted);
router.post('/:taskId/markPending', taskController.markPending);

module.exports = router;
