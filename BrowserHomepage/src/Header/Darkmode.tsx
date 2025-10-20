// src/components/DarkMode.js
import { useEffect } from 'react';
import type { RootState } from '../Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode } from '../Redux/DarkmodeSlice';

export default function DarkMode() {
    const currentMode = useSelector((state: RootState) => state.theme.mode);
    const dispatch = useDispatch();

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(currentMode);
    }, [currentMode]);

    const handleToggle = () => {
        dispatch(toggleMode());
    };

    const isDark = currentMode === 'dark';

    return (
        <button
            title={`turn off ${currentMode} mode`}
            onClick={handleToggle}
            className='w-10 h-10 flex justify-center place-items-center rounded-full bg-slate-400 dark:bg-slate-500 cursor-pointer border-0 outline-0 dark:rotate-0 rotate-45 '
        >
            {isDark ? "☀️" : "🌒"}
        </button>
    )
}