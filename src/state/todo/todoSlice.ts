// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
//   date: string;
// }

// interface TodoState {
//   todos: Todo[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const loadTodosFromLocalStorage = (): Todo[] => {
//   const savedTodos = localStorage.getItem("todos");
//   return savedTodos ? JSON.parse(savedTodos) : [];
// };

// const initialState: TodoState = {
//   todos: loadTodosFromLocalStorage(),
//   status: "idle",
//   error: null,
// };

// const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     addTodo: (
//       state,
//       action: PayloadAction<{ title: string; date: string }>
//     ) => {
//       const newTodo = {
//         id: state.todos.length + 1,
//         title: action.payload.title,
//         completed: false,
//         date: new Date(action.payload.date).toLocaleDateString("en-GB"),
//       };
//       state.todos.unshift(newTodo);
//       localStorage.setItem("todos", JSON.stringify(state.todos));
//     },
//     toggleTodo: (state, action: PayloadAction<number>) => {
//       const todo = state.todos.find((todo) => todo.id === action.payload);
//       if (todo) {
//         todo.completed = !todo.completed;
//         localStorage.setItem("todos", JSON.stringify(state.todos));
//       }
//     },
//     deleteTodo: (state, action: PayloadAction<number>) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload);
//       localStorage.setItem("todos", JSON.stringify(state.todos));
//     },
//   },
// });

// export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

// export default todoSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { database } from "../../firebaseConfig";
import { ref, set, push, update, remove } from "firebase/database";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

interface TodoState {
  todos: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (
      state,
      action: PayloadAction<{ title: string; date: string }>
    ) => {
      const newTodoRef = push(ref(database, "todos")); // Create a new key in Firebase
      const newTodo = {
        id: newTodoRef.key as string,
        title: action.payload.title,
        completed: false,
        date: new Date(action.payload.date).toLocaleDateString("en-GB"),
      };
      set(newTodoRef, newTodo); // Save the todo to Firebase
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
        update(ref(database, `todos/${todoId}`), { completed: todo.completed });
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
      remove(ref(database, `todos/${todoId}`));
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
