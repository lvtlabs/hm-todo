const express = require("express");
const router = express.Router();

const todoController=require('../controllers/todo_controller');
router.post('/todo-tasks',todoController.saveTodoTask);
router.get('/get-toDotasks',todoController.toDoTasks)
router.get('/get-clientTasks',todoController.clientTodotasks);
router.get('/get-task-status',todoController.getTaskStatus);
router.put('/task-mark-as-done',todoController.updateTaskMarkAsDone)
module.exports = router;

