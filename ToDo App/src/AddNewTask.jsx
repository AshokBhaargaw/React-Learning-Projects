import React, { useState } from 'react'
import { useTodo } from './store'

export default function AddNewTask() {
    const [input, setInput] = useState("")
    const { state, dispatch } = useTodo();
    const [taskAlreadyHave, settaskAlreadyHave] = useState(false)


    const formHandler = (e) => {
        e.preventDefault()
        if (input.trim()) {
            if (state.some(task => task.tText == input)) {
                settaskAlreadyHave(true)
            }
            else {
                dispatch({ type: 'addTask', payload: { tID: Date.now(), tText: input, tDone: false } })
                settaskAlreadyHave(false)
                setInput("")
            }
        }
    }

    return (
        <div>
            <form onSubmit={formHandler} className='flex justify-between border h-10 rounded-2xl bg-white'>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className=' p-2 pl-5 outline-none border-none w-10/12 h-full'
                />
                <button className='text-white font-bold text-xl w-2/12 h-full bg-blue-600 hover:bg-blue-800 rounded-r-2xl' >Add</button>
            </form>
            {taskAlreadyHave && <p className='text-red-500'>Task Already Exits</p>}
        </div>
    )
}
