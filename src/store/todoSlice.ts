// src/redux/todosSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "../util/storage";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodosState {
  todos: Todo[];
}

const loadTodosFromStorage = (): Todo[] => {
  try {
    const storedTodos = storage.get("todos");
    return storedTodos ? storedTodos : [];
  } catch (error) {
    console.error("Error loading todos from localStorage:", error);
    return [];
  }
};

const saveTodosToStorage = (todos: Todo[]) => {
  try {
    storage.set("todos", todos);
  } catch (error) {
    console.error("Error saving todos to localStorage:", error);
  }
};

const initialState: TodosState = {
  todos: loadTodosFromStorage(),
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state: TodosState, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
      saveTodosToStorage(action.payload);
    },
    addTodo(state: TodosState, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
      saveTodosToStorage(state.todos);
    },
    updateTodo(state: TodosState, action: PayloadAction<Todo>) {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
        saveTodosToStorage(state.todos);
      }
    },
    deleteTodo(state: TodosState, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodosToStorage(state.todos);
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
