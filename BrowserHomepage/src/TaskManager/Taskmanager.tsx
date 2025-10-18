import { useSelector } from 'react-redux'
import type { RootState } from '../Redux/store'
import AddNewTask from './AddNewTask'
import TaskTemplate from './TaskTemplate'

export default function Taskmanager() {
    const tasks = useSelector((state: RootState) => (state.todo.tasks))
    return (
        <div className='bg-slate-200 rounded-xl w-full min-w-100 max-w-150 min-h-100 '>
            <div className='flex justify-between h-12'>
                <h1 className='text-2xl font-bold mt-1 mx-5 w-2/12 inline'>Tasks</h1>
                <AddNewTask />
            </div>
            <hr className='text-white' />
            <div>
                {tasks.map(task => (
                    <TaskTemplate
                        key={task.id}
                        taskData={task}
                    />
                ))}
            </div>
        </div>
    )
}
