import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setTodos,
  renameTodo,
} from "../state/todo/todoSlice";
import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

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
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  // Fetch todos from Firebase on component mount
  useEffect(() => {
    const todosRef = ref(database, "todos");
    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todosArray = Object.entries(data).map(
          ([id, todo]: [string, unknown]) => ({
            id,
            title: (todo as { title: string }).title,
            date: (todo as { date: string }).date,
            completed: (todo as { completed: boolean }).completed || false,
          })
        );
        dispatch(setTodos(todosArray));
      } else {
        dispatch(setTodos([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() && newDate.trim()) {
      dispatch(addTodo({ title: newTodo, date: newDate }));
      setNewTodo("");
      setNewDate("");
    }
  };

  const handleRenameTodo = (todoId: string) => {
    if (newTitle.trim()) {
      dispatch(renameTodo({ id: todoId, newTitle }));
      setEditingTodoId(null);
      setNewTitle("");
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
        <button className="todo-btn w-full md:w-auto" onClick={handleAddTodo}>
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
            <div className="flex flex-wrap mt-5 justify-between md:justify-normal md:gap-3">
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
              <button
                className="bg-yellow-600 text-white rounded-md p-1 px-3"
                onClick={() => {
                  setEditingTodoId(todo.id);
                  setNewTitle(todo.title);
                }}
              >
                Rename
              </button>
            </div>
            {editingTodoId === todo.id && (
              <div className="mt-5 flex flex-wrap gap-3">
                <input
                  className="todo-input "
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button
                  className="todo-btn w-full md:w-auto mx-auto md:mx-0 md:px-5"
                  onClick={() => handleRenameTodo(todo.id)}
                >
                  Save
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
