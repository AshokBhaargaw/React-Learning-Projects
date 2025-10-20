import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}

interface TodoState {
    tasks: Task[];
}

interface ToggleCompletedPayload {
    id: number;
}

interface EditTaskPayload {
    id: number;
    title: string;
    description?: string;
}

interface AddTaskPayload {
    title: string;
    description?: string;
}

interface DeleteTaskPayload {
    id: number;
}

const initialState: TodoState = {
    tasks: [
        { id: 1, title: 'make projects to learn Redux Toolkit', description: 'Setup three small projects.', completed: false },
        { id: 2, title: 'Implement single-open logic', description: 'Ensure only one detail view is active at a time.', completed: false },
        { id: 3, title: 'Refactor TaskTemplate for edit mode', description: 'Switch readOnly inputs to editable inputs using local state.', completed: true },
    ]
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<AddTaskPayload>) => {
            const newTask: Task = {
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false,
            };
            state.tasks.unshift(newTask);
        },

        toggleTaskCompleted: (state, action: PayloadAction<ToggleCompletedPayload>) => {
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task) {
                task.completed = !task.completed;
            }
        },

        editTask: (state, action: PayloadAction<EditTaskPayload>) => {
            const { id, title, description } = action.payload;
            const task = state.tasks.find(t => t.id === id);

            if (task) {
                task.title = title;
                task.description = description;
            }
        },

        deleteTask: (state, action: PayloadAction<DeleteTaskPayload>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload.id);
        },
    },
});

export const { addTask, toggleTaskCompleted, editTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
