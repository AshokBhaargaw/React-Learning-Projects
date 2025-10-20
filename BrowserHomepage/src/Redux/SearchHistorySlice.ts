import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HistoryEntry {
    query: string;
    mode: 'google' | 'youtube';
}

interface InitialState {
    history: HistoryEntry[];
}

const loadState = (): InitialState => {
    try {
        const savedState = localStorage.getItem('searchHistory');
        return savedState ? JSON.parse(savedState) : { history: [] };
    } catch (e) {
        console.error('Failed to load state from localStorage:', e);
        return { history: [] };
    }
};

const initialState: InitialState = loadState();

export const HistorySlice = createSlice({
    name: 'Search History',
    initialState,
    reducers: {
        addSearchHistory: (state, action: PayloadAction<{ query: string; mode: 'google' | 'youtube' }>) => {
            const { query, mode } = action.payload;
            if (query && !state.history.some(entry => entry.query === query && entry.mode === mode)) {
                state.history = [{ query, mode }, ...state.history].slice(0, 10);
                localStorage.setItem('searchHistory', JSON.stringify(state));
            }
        },
        removeSearchQuery: (state, action: PayloadAction<string>) => {
            state.history = state.history.filter(history => history.query !== action.payload)
        }
    }
});

export const { addSearchHistory, removeSearchQuery } = HistorySlice.actions;
export default HistorySlice.reducer;