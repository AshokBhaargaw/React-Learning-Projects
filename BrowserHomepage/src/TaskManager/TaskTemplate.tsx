import { useState, useRef, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDropdown, IoIosMenu, IoIosArrowDropup } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toggleTaskCompleted } from '../Redux/TodoSlice';

import TaskOptionMenu from './TaskOptionMenu';

interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}
interface TaskTemplateProps {
    taskData: Task;
}
export default function TaskTemplate({ taskData }: TaskTemplateProps) {
    const { id, title, description, completed } = taskData;
    const [showDesc, setShowDesc] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    const dispatch = useDispatch();

    const toggleCompletedHandler = () => {
        dispatch(toggleTaskCompleted({ id }));
    }


    return (
        <div
            className={`relative flex flex-col ${showDesc || showOptions ? 'rounded-t-xl rounded-l-xl' : 'rounded-xl'} bg-slate-800 text-slate-200 dark:bg-slate-900 dark:text-slate-200 min-h-10 mt-2 mx-5 border pt-2  `} >
            <div className={`flex justify-between `}>
                <input
                    className='ml-5 mr-3 mt-1 size-4.5 cursor-pointer border-0 outline-0'
                    type="checkbox"
                    checked={completed}
                    onChange={toggleCompletedHandler}
                />
                <input
                    type="text"
                    readOnly
                    value={title}
                    // Apply line-through style if completed
                    className={`h-full w-full outline-0 ${completed ? 'line-through text-gray-500' : ''}`}
                />
                <span className='w-2/12 flex justify-evenly'>
                    <button
                        onClick={() => setShowDesc(!showDesc)}
                        className='cursor-pointer border-0 outline-0'>
                        {
                            showDesc ?
                                <IoIosArrowDropup size={23} />
                                : <IoIosArrowDropdown size={23} />
                        }
                    </button>
                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        className='cursor-pointer'>
                        {
                            showOptions ? <RxCross2 size={23} /> : <IoIosMenu size={23} />
                        }
                    </button>
                </span>
            </div>
            {
                showDesc &&
                <textarea
                    className='w-full rounded-bl-xl dark:bg-secondary bg-slate-50 text-dark-primary mt-2 pl-5 border-0 outline-0'
                    value={description || "No description added"}
                    readOnly
                />
            }
            {
                showOptions &&
                <TaskOptionMenu taskData={{ id, title }} />
            }

        </div >
    )
}
