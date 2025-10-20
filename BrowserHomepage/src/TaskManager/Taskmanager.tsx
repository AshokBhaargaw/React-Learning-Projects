import { useSelector } from 'react-redux'
import type { RootState } from '../Redux/store'
import AddNewTask from './AddNewTask'
import TaskTemplate from './TaskTemplate'
import { useState } from 'react' // Import useState

interface ActiveDetails {
    taskId: number | null;
    mode: 'description' | 'options' | 'edit' | null;
}

export default function Taskmanager() {
    const tasks = useSelector((state: RootState) => (state.todo.tasks))
    const [activeDetails, setActiveDetails] = useState<ActiveDetails>({
        taskId: null,
        mode: null,
    });

    const handleToggleDetails = (taskId: number, mode: ActiveDetails['mode']) => {
        if (activeDetails.taskId === taskId && activeDetails.mode === mode) {
            setActiveDetails({ taskId: null, mode: null });
        } else {
            setActiveDetails({ taskId, mode });
        }
    };

    const handleCloseDetails = () => {
        setActiveDetails({ taskId: null, mode: null });
    };

    return (
        <div className='bg-slate-200 dark:bg-slate-800 rounded-xl w-full min-w-100 max-w-150 min-h-100 '>
            <div className='flex justify-between h-12'>
                <h1 className='text-2xl font-bold mt-1 mx-5 w-2/12 inline'>Tasks</h1>
                <AddNewTask />
            </div>
            <hr className='dark:text-slate-200 text-slate-800 ' />
            <div>
                {tasks.map(task => (
                    <TaskTemplate
                        key={task.id}
                        taskData={task}
                        activeDetails={activeDetails}
                        onToggleDetails={handleToggleDetails}
                        onCloseDetails={handleCloseDetails}
                    />
                ))}
            </div>
        </div>
    )
}
