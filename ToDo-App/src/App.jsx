import React from 'react'
import { useTodo } from './store'
import AddNewTask from './AddNewTask';
import TaskTemplate from './TaskTemplate';
import DoneAndClear from './DoneAndClear';




export default function App() {
  const { state, dispatch } = useTodo();

  return (
    <div className='flex justify-center place-items-center min-h-screen'>
      <div className='bg-purple-100 w-120 min-h-100 rounded-2xl p-5 hover:shadow-xl'>
        <h1 className='font-bold text-2xl text-center '>To Do App</h1>
        <hr className='my-3 ' />
        <AddNewTask />
        {
          state.length > 1 && <DoneAndClear />
        }
        {
          state.map(taskData => <TaskTemplate key={taskData.tID} data2show={[taskData.tDone, taskData.tText, taskData.tID]} />)
        }
      </div>
    </div>
  )
}
