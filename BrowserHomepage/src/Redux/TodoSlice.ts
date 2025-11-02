import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TodoState {
  tasks: Task[];
}

const LocalLoader = () => {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const saveLocally = (tasks: Task[]) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (err) {
    console.error(err);
  }
};

const initialState: TodoState = {
  tasks: LocalLoader(),
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ title: string; description?: string }>
    ) => {
      state.tasks.unshift({
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      });
      saveLocally(state.tasks);
    },

    toggleTaskCompleted: (state, action: PayloadAction<{id:number}>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.completed = !task.completed;
      saveLocally(state.tasks);
    },

    editTask: (
      state,
      action: PayloadAction<{ id: number; title: string; description?: string }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
      }
      saveLocally(state.tasks);
    },

    deleteTask: (state, action: PayloadAction<{id:number}>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
      saveLocally(state.tasks);
    },
  },
});

export const { addTask, toggleTaskCompleted, editTask, deleteTask } =
  todoSlice.actions;
export default todoSlice.reducer;
