import logo from "./logo.svg";
import "./App.css";
import "./css/style.scss";
import TodoList from "./components/TodoList.jsx";

function App() {
  return (
    <div id="container">
      <div className="text-center mt-3 mb-5">
        <h1>To Do List App</h1>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
