import { useState, useEffect } from 'react'; // Added useEffect for state initialization
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDropdown, IoIosMenu, IoIosArrowDropup } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toggleTaskCompleted, editTask } from '../Redux/TodoSlice'; // Assuming editTask action exists

import TaskOptionMenu from './TaskOptionMenu';

interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}

interface ActiveDetails {
    taskId: number | null;
    mode: 'description' | 'options' | 'edit' | null;
}

interface TaskTemplateProps {
    taskData: Task;
    activeDetails: ActiveDetails;
    onToggleDetails: (taskId: number, mode: ActiveDetails['mode']) => void;
    onCloseDetails: () => void;
}

export default function TaskTemplate({ taskData, activeDetails, onToggleDetails, onCloseDetails }: TaskTemplateProps) {
    const { id, title, description, completed } = taskData;
    const isEditing = activeDetails.taskId === id && activeDetails.mode === 'edit';
    const showDesc = activeDetails.taskId === id && activeDetails.mode === 'description';
    const showOptions = activeDetails.taskId === id && activeDetails.mode === 'options';
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description || "");

    const dispatch = useDispatch();

    useEffect(() => {
        if (isEditing) {
            setEditedTitle(title);
            setEditedDescription(description || "");
        }
    }, [isEditing, title, description]);

    const toggleCompletedHandler = () => {
        dispatch(toggleTaskCompleted({ id }));
    }

    const handleSave = () => {
        const trimmedTitle = editedTitle.trim();
        const newDescription = editedDescription.trim() === '' ? undefined : editedDescription;

        if (trimmedTitle === '') {
            console.error("Task title cannot be empty.");
            return;
        }

        dispatch(editTask({
            id,
            title: trimmedTitle,
            description: newDescription,
        }));
        onCloseDetails();
    }

    const handleCancel = () => {
        setEditedTitle(title);
        setEditedDescription(description || "");
        onCloseDetails();
    }

    const handleStartEdit = () => {
        onToggleDetails(id, 'edit');
    };

    return (
        <div
            className={`relative flex flex-col ${showDesc || showOptions || isEditing ? 'rounded-t-xl rounded-l-xl' : 'rounded-xl'} bg-white dark:bg-slate-900 dark:text-slate-200 min-h-10 mt-2 mx-5 border pt-2  `} >

            <div className={`flex justify-between ${isEditing ? 'px-2' : ''}`}>
                <input
                    className='ml-5 mr-3 mt-1 size-4.5 cursor-pointer border-0 outline-0'
                    type="checkbox"
                    checked={completed}
                    onChange={toggleCompletedHandler}
                    disabled={isEditing}
                />
                <input
                    type="text"
                    readOnly={!isEditing}
                    value={isEditing ? editedTitle : title}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className={`h-full w-full outline-0 ${completed ? 'line-through text-gray-500' : ''} ${isEditing ? 'bg-slate-700 p-1 rounded border border-blue-500' : 'bg-transparent'}`}
                />
                {!isEditing && (
                    <span className='w-2/12 flex justify-evenly'>
                        <button
                            onClick={() => onToggleDetails(id, 'description')}
                            className='cursor-pointer border-0 outline-0'>
                            {
                                showDesc ?
                                <IoIosArrowDropup size={23} />
                                : <IoIosArrowDropdown size={23} />
                            }
                        </button>
                        <button
                            onClick={() => onToggleDetails(id, 'options')}
                            className='cursor-pointer border-0 outline-0'>
                            {
                                showOptions ? <RxCross2 size={23} /> : <IoIosMenu size={23} />
                            }
                        </button>
                    </span >
                )}
            </div>

            {showDesc && !isEditing && (
                <div className='w-full rounded-bl-xl dark:bg-secondary bg-slate-50 mt-2 pl-5 border-0 outline-0'>
                    <div dangerouslySetInnerHTML={{ __html: description ?? 'Desction not added' }} />
                </div>

            )}

            {showOptions && !isEditing && (
                <TaskOptionMenu
                    taskData={{ id, title }}
                    onClose={onCloseDetails}
                    onStartEdit={handleStartEdit}
                />
            )}

            {isEditing && (
                <div className="flex flex-col p-3 space-y-2">
                    <textarea
                        className='w-full dark:bg-slate-700 bg-slate-100 text-slate-200 dark:text-slate-200 p-2 border border-blue-500 rounded outline-0 resize-y min-h-[80px]'
                        placeholder="Add description..."
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={handleCancel}
                            className="px-3 py-1 text-sm rounded bg-gray-500 hover:bg-gray-600 transition text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 text-sm rounded bg-blue-600 hover:bg-blue-700 transition text-white"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div >
    )
}
