import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/TodoSlice';
import { MdOutlineCancel } from "react-icons/md";
import { IoMdAddCircleOutline, IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";


export default function AddNewTask() {
    const [input, setinput] = useState('')
    const [desc, setDesc] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);

    const [addingTask, setAddingTask] = useState(Boolean)
    const [addDesc, setAddDesc] = useState(false)
    const dispatch = useDispatch();

    // Adding task
    const addTaskHandler = () => {
        if (input) {
            dispatch(addTask({ title: input, description: desc }))
            setinput('')
            setAddingTask(false)
            setAddDesc(false)
            setDesc('');
        } else {
            inputRef.current?.focus()
            inputRef.current && (inputRef.current.placeholder = 'Please add task title first...')
        }
    }

    // Cancelling task creation
    const canceltaskCreations = () => {
        if (input && window.confirm("Are you sure you want to cancel this task? This action cannot be undone.")) {
            setAddingTask(false)
            setinput('')
            setAddDesc(false)
        } else {
            setAddingTask(false)
            setinput('')
            setAddDesc(false)
        }
    }
    return (
        <div className='w-full flex flex-col pr-3 pt-2'>
            {addingTask ?
                <div className='w-full flex justify-end'>
                    <input
                        placeholder='Add ToDo...'
                        ref={inputRef}
                        autoFocus
                        onChange={e => setinput(e.target.value)}
                        value={input}
                        type="text"
                        className='bg-slate-100 dark:bg-dark-secondary border-y border-l rounded-l h-8 w-9/12 px-2 outline-none'
                    />
                    <span className='bg-blue-400 text-white h-8 w-3/12 rounded flex justify-evenly' >
                        <button
                            onClick={addTaskHandler}
                            title="Add Task"
                            className=' cursor-pointer hover:text-purple-700 outline-0 border-0'>
                            <IoMdAddCircleOutline size={20} />
                        </button>
                        <button
                            onClick={() => setAddDesc(!addDesc)}
                            title="Add desciption"
                            className='cursor-pointer hover:text-green-900 outline-0 border-0'>
                            {
                                addDesc ?
                                    <IoIosArrowDropup size={20} />
                                    : <IoIosArrowDropdown size={20} />
                            }
                        </button>
                        <button
                            onClick={canceltaskCreations}
                            title="Cancel"
                            className='hover:text-red-700 cursor-pointer outline-0 border-0'>
                            <MdOutlineCancel size={20} />
                        </button>
                    </span>
                </div>
                :
                <div className='w-full flex justify-end'>
                    <button
                        className='bg-blue-400 text-white h-8 w-3/12 font-bold rounded cursor-pointer'
                        onClick={() => setAddingTask(true)}>
                        Add Task
                    </button>
                </div>
            }
            {addDesc &&
                <div className='relative'>
                    <textarea
                        onChange={e => setDesc(e.target.value)}
                        rows={5}
                        className='bg-slate-100 dark:bg-dark-background w-full pl-2  rounded-b absolute top-0 right-0 z-2 outline-0 '
                        placeholder='Add description...' />
                </div>
            }
        </div>
    )
}
