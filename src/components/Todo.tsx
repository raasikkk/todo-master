import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setTodos,
} from "../state/todo/todoSlice";
import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

// Define a type for the Todo object
interface Todo {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const [newTodo, setNewTodo] = useState("");
  const [newDate, setNewDate] = useState("");

  // Fetch todos from Firebase on component mount
  useEffect(() => {
    const todosRef = ref(database, "todos");
    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Map the Firebase data to an array of Todo objects
        const todosArray = Object.entries(data).map(
          ([id, todo]: [string, unknown]) => ({
            id,
            title: (todo as { title: string }).title,
            date: (todo as { date: string }).date,
            completed: (todo as { completed: boolean }).completed || false, // Handle incomplete data
          })
        );
        dispatch(setTodos(todosArray));
      } else {
        dispatch(setTodos([]));
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() && newDate.trim()) {
      dispatch(addTodo({ title: newTodo, date: newDate }));
      setNewTodo("");
      setNewDate("");
    }
  };

  return (
    <div>
      <h1 className="mt-5 text-3xl font-bold text-violet-700">
        <span className="text-4xl">✅</span>Tasks
      </h1>

      <div className="flex flex-wrap gap-5 mt-5">
        <input
          className="todo-input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <input
          className="todo-input"
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          placeholder="Set a new date"
        />
        <button className="todo-btn" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <ul className="todo-ul">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${
              todo.completed ? "bg-green-600/70" : ""
            } flex flex-col mt-5 rounded-md p-3 border-4 border-violet-700`}
          >
            <span className="font-semibold text-lg">{todo.title}</span>
            <span>Due Date: {todo.date}</span>
            <div className="flex flex-wrap mt-3 gap-3 ">
              <button
                className={`${
                  todo.completed ? "bg-green-600" : "bg-blue-600"
                } rounded-md p-1 px-3 text-white transition`}
                onClick={() => dispatch(toggleTodo(todo.id))}
              >
                {todo.completed ? "Completed" : "Complete"}
              </button>
              <button
                className="bg-red-600 text-white rounded-md p-1 px-3"
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
