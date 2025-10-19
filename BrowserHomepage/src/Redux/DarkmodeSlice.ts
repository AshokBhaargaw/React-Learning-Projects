import { createSlice } from '@reduxjs/toolkit';

const getInitialMode = () => {
  const savedMode = localStorage.getItem('themeMode');
  if (savedMode) return savedMode;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const initialState = {
  mode: getInitialMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.mode);
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;