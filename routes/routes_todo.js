const express = require("express");
const router = express.Router();

const todoController=require('../controllers/todo_controller');
router.post('/todo-tasks',todoController.saveTodoTask);
router.get('/get-toDotasks',todoController.toDoTasks)
router.get('/get-clientTasks',todoController.clientTodotasks)
module.exports = router;

