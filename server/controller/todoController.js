const Todo = require("../model/todoModel");
const ListTodoId = require("../model/listModel");

const listKeyId = "62bc070771c1d3344a7b1648";

// Function get all todos from database
const getAllTodos = async (req, res) => {
  try {
    // Find todo list base on listKey
    const todoList = await ListTodoId.findById(listKeyId).populate("taskId");
    const listId = await ListTodoId.findById(listKeyId);

    res.status(200).send({ todoList: todoList.taskId, listId: listId.taskId });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};  

// Function create new todo from React to database
const createTodo = async (req, res) => {
  try {
    //Request obj from api
    const reqNewTodoObj = req.body;
    // Assign Schema
    const newTodo = new Todo({
      listKey: listKeyId,
      description: reqNewTodoObj.description,
      status: reqNewTodoObj.status,
    });
    // Save newTodo to database
    await newTodo.save();

    // Find listTodoId by id
    const list = await ListTodoId.findById(listKeyId);
    // Push todo id to list
    list.taskId.push(newTodo._id);

    // Save listTodoId to database
    await list.save();

    res.status(200).send(newTodo);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

// Function delete to do base on id
const deleteTodoById = async (req, res) => {
  try {
    // Delete todo base on request id
    await Todo.deleteOne({ _id: req.params.id });

    // Find listTodoId base on id
    const list = await ListTodoId.findById(listKeyId);
    // Remove id from list
    list.taskId.pull(req.params.id);

    // Save list to database
    await list.save();
    res.status(200).send("Delete success");
  } catch (error) {
      console.log(error);
      res.status(404).send(error);
  }
};

// Function update checkbox base on id
const updateTodoCheckbox = async (req, res) => {
  try {
    // request update todo id from url
    const updateCheckboxId = req.params.id;
    // find todo base on id
    const todoFindById = await Todo.findById(updateCheckboxId);

    // change status of todo
    todoFindById.status
      ? (todoFindById.status = false)
      : (todoFindById.status = true);

    // save todo
    todoFindById.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    // request new order todo array
    const reqIdArray = await req.body;
    // Find the original todo array
    const listId = await ListTodoId.findById(listKeyId);

    // update todo array
    await ListTodoId.updateOne(listId, { taskId: reqIdArray });

    res.status(200).send();
  } catch (err) {
    res.status(404).send(err);
    console.log(err);
  }
  // request fromId and toId
};

const deleteTodo = (module.exports = {
  getAllTodos,
  createTodo,
  deleteTodoById,
  updateTodoCheckbox,
  updateTodo,
});
