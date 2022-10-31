import { React, useState, useEffect, useRef } from "react";
import axios from "axios";

function TodoList() {
  // set task text default state
  const [textInput, setTextInput] = useState("");
  const [dragging, setDragging] = useState(false);

  // set array task default state
  const [taskArray, setTaskArray] = useState([]);

  // set default todo state
  const [newTodo, setNewTodo] = useState({
    description: "",
    status: false,
  });

  // Set default array id
  const [arrayId, setArrayId] = useState([]);

  // set default change state
  const [change, setChange] = useState(false);

  let fromId = useRef();
  let toId = useRef();

  // Function fetch all todos from database
  function getAllTodos() {
    axios
      .get("http://localhost:8080/api/todos")
      .then((response) => {
        const listId = response.data.listId;
        const todoList = response.data.todoList;

        setArrayId(listId);
        setTaskArray(todoList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Fetch all todos from database
  useEffect(() => {
    getAllTodos();
  }, [change]);

  // function handle input task text change
  const handInputTaskText = (e) => {
    let text = e.target.value;
    setTextInput(text);
  };

  // function handle input task button
  const handleSubmitTask = (e) => {
    // validate input text
    if (textInput === "") {
      alert("Task để trống!");
      return;
    }
    // set inputText to newTodo description
    newTodo.description = textInput;

    // Post newTodo to database
    axios.post("http://localhost:8080/api/todos", newTodo).then((response) => {
      setTextInput("");
      // reset newTodo
      setNewTodo({
        description: "",
        status: false,
      });
      setChange(!change);
    });
  };

  // function handle checkbox
  const handleCheckBox = (e) => {
    // index of check box
    let idCheckBox = e.target.dataset.id;

    // Put update todo checkbox base on id
    axios
      .put(`http://localhost:8080/api/todos/update/${idCheckBox}`)
      .then((response) => {
        setChange(!change);
      });
  };

  // function handle delete button
  const handleDeleteButton = (e) => {
    // Id of todo
    let todoId = e.target.dataset.id;
    // Delete todo base on id
    axios
      .delete(`http://localhost:8080/api/todos/delete/${todoId}`)
      .then((response) => {
        setChange(!change);
      });
  };

  // function handle on drag start
  const handleDragStart = (e, index) => {
    fromId = e.target.dataset.id;
  };

  const getStyle = (e, index) => {
    if (dragging) {
      return "current";
    }
    return "list-group-item item";
  };
  // function handle on drag enter
  const handleDragEnter = (e, index) => {
    toId = e.target.dataset.id;
  };

  //function handle on drag end
  const handleDragEnd = () => {
    // clone id array
    const cloneIdArray = [...arrayId];
    // Find from index
    const fromIndex = cloneIdArray.findIndex((id) => id === fromId);
    // Find to index
    const toIndex = cloneIdArray.findIndex((id) => id === toId);

    const element = cloneIdArray[fromIndex];
    // change clone id array
    cloneIdArray.splice(fromIndex, 1);
    cloneIdArray.splice(toIndex, 0, element);

    // Set clone id array to array id
    setArrayId(cloneIdArray);

    axios
      .put("http://localhost:8080/api/todos/update", cloneIdArray)
      .then((response) => {
        setChange(!change);
      });
  };

  // Function handleKeyDown
  const handleKeyDown = (e, index) => {
    if (e.keyCode === 13) {
      handleSubmitTask();
    }
  };

  return (
    <div id="input-task-div">
      <div className="input-row">
        <div className="input-group">
          <input
            type="text"
            className="input-text"
            placeholder="New task"
            id="input-task"
            onChange={handInputTaskText}
            onKeyDown={handleKeyDown}
            value={textInput}
          />
          <button
            className="input-btn"
            type="button"
            id="btn-addon"
            onClick={handleSubmitTask}
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="list-row">
        <ul className="list-group" id="list">
          {taskArray.map((task, index) => (
            <li
              className="list-group-item item"
              data-index={index}
              data-id={task._id}
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
            >
              <input
                className="form-check-input"
                type="checkbox"
                data-id={task._id}
                onChange={handleCheckBox}
                checked={task.status}
              />
              <p>{task.description}</p>
              <button
                type="button"
                className="delete"
                data-id={task._id}
                onClick={handleDeleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
