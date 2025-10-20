import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../Redux/TodoSlice';

interface Task {
    id: number;
    title: string;
}

interface TaskOptionMenuProps {
    taskData: Task;
    onClose: () => void; 
    onStartEdit: () => void; 
}

export default function TaskOptionMenu({ taskData, onClose, onStartEdit }: TaskOptionMenuProps) {
    const { id, title } = taskData;
    const dispatch = useDispatch();
    const [isConfirming, setIsConfirming] = useState(false); // State for custom confirmation

    const handleDelete = () => {
        setIsConfirming(true);
    }

    const confirmDelete = () => {
        dispatch(deleteTask({ id: id }));
        onClose();
    }

    const cancelDelete = () => {
        setIsConfirming(false);
    }

    const handleEditClick = () => {
        onStartEdit();
    }

    return (
        <div className='absolute right-0 top-10 z-12 dark:bg-slate-700 bg-slate-100 border-x border-b border-gray-600 rounded-b pb-1 w-50 shadow-lg min-w-[200px]'>
            {isConfirming ? (
                <div className="p-2 border-t dark:border-slate-600 bg-red-800 rounded-b">
                    <p className="text-sm dark:text-slate-200 text-white p-2">Are you sure you want to delete "{title}"?</p>
                    <div className="flex justify-end space-x-2 p-1">
                        <button
                            onClick={cancelDelete}
                            className='px-3 py-1 text-xs rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className='px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600 transition'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <button
                        onClick={handleDelete}
                        className='w-full text-left dark:hover:bg-slate-600 hover:bg-red-100 cursor-pointer pl-2 py-1 transition'
                    > Delete Task</button>
                    <button
                        onClick={handleEditClick} // New edit handler
                        className='w-full text-left dark:hover:bg-slate-600 hover:bg-blue-100 cursor-pointer pl-2 py-1 transition'
                    > Edit Task</button>
                </>
            )}
        </div>
    )
}
