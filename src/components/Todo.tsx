import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { addTodo, toggleTodo, deleteTodo } from "../state/todo/todoSlice";

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const status = useSelector((state: RootState) => state.todo.status);
  const error = useSelector((state: RootState) => state.todo.error);

  const [newTodo, setNewtodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewtodo("");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-violet-700">To-Do App</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <div className="flex gap-5">
        <input
          className="todo-input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewtodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button className="todo-btn" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <ul className="todo-ul">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <div className="li-btns">
              <button onClick={() => dispatch(toggleTodo(todo.id))}>
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => {
                  dispatch(deleteTodo(todo.id));
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
