import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface Task {
    id: number
    title: string
    description?: string
    completed: boolean
}

const LOCAL_STORAGE_KEY = 'TODO_TASKS';


const loadTasksFromLocalStorage = (): Task[] => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            return []; // No tasks saved yet
        }
        return JSON.parse(serializedState) as Task[];
    } catch (e) {
        console.error("Could not load state from localStorage", e);
        return [];
    }
};


const saveTasksToLocalStorage = (tasks: Task[]) => {
    try {
        const serializedState = JSON.stringify(tasks);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (e) {
        console.error("Could not save state to localStorage", e);
    }
};

export interface TodoState {
    tasks: Task[]
}

const initialState: TodoState = {
    tasks: loadTasksFromLocalStorage(),
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ title: string; description?: string }>) => {
            const newTask: Task = {
                id: Date.now(), 
                title: action.payload.title,
                description: action.payload.description,
                completed: false
            }
            state.tasks.push(newTask)
            saveTasksToLocalStorage(state.tasks);
        },

        deleteTask: (state, action: PayloadAction<{ id: number }>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
            saveTasksToLocalStorage(state.tasks);
        },

        toggleTaskCompleted: (state, action: PayloadAction<{ id: number }>) => {
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task) {
                task.completed = !task.completed;
            }
            saveTasksToLocalStorage(state.tasks);
        }
    },
})


export const { addTask, deleteTask, toggleTaskCompleted } = todoSlice.actions
export default todoSlice.reducer
