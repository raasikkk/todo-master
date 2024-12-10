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
      const newTodoRef = push(ref(database, "todos"));
      const newTodo = {
        id: newTodoRef.key as string,
        title: action.payload.title,
        completed: false,
        date: new Date(action.payload.date).toLocaleDateString("en-GB"),
      };
      set(newTodoRef, newTodo);

      state.todos.unshift(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
        update(ref(database, `todos/${todoId}`), { completed: todo.completed });

        const index = state.todos.findIndex((todo) => todo.id === todoId);
        if (index !== -1) {
          state.todos[index].completed = todo.completed;
        }
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
      remove(ref(database, `todos/${todoId}`));
    },
    renameTodo: (
      state,
      action: PayloadAction<{ id: string; newTitle: string }>
    ) => {
      const { id, newTitle } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = newTitle;
        update(ref(database, `todos/${id}`), { title: newTitle });
      }
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo, renameTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
