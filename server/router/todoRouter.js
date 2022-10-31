const express = require("express");
const todoRouter = express.Router();
const todoController = require("../controller/todoController");

todoRouter.get("/", todoController.getAllTodos);
todoRouter.post("/", todoController.createTodo);
todoRouter.delete("/delete/:id", todoController.deleteTodoById);
todoRouter.put("/update/:id", todoController.updateTodoCheckbox);
todoRouter.put("/update/", todoController.updateTodo);

module.exports = todoRouter;
