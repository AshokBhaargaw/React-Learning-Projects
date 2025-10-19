import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompleted } from '../Redux/TodoSlice';

interface Task {
    id: number;
    title: string;
}

interface TaskOptionMenuProps {
    taskData: Task;
}

export default function TaskOptionMenu({ taskData }: TaskOptionMenuProps) {
    const { id, title } = taskData;
    const dispatch = useDispatch();

    const dltHandler = () => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the task: "${title}"? This action cannot be undone.`);
        if (isConfirmed) { dispatch(deleteTask({ id: id })) }
    }

    return (
        <div className='absolute right-0 top-10 z-12 dark:bg-dark-background bg-slate-100 border-x border-b rounded-b pb-1 w-50'>
            <button
                onClick={dltHandler}
                className='w-full text-left dark:hover:bg-dark-secondary hover:bg-red-100 cursor-pointer pl-2'
            > Delete Task</button>
            <button
                className='w-full text-left dark:hover:bg-dark-secondary hover:bg-blue-100 cursor-pointer pl-2'
            > Edit Task</button>
            <button
                className='w-full text-left dark:hover:bg-dark-secondary hover:bg-blue-100 cursor-pointer pl-2'
            > Archive Task</button>
        </div>
    )
}
