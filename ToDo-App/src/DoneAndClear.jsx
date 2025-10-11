import React, { useState } from 'react'
import { useTodo } from './store';

export default function DoneAndClear() {
    const { state, dispatch } = useTodo();
    const havePending = state.some(task => !task.tDone)

    const MarkHandler = () => {
        if (havePending) {
            window.confirm("Are you sure, you want to mark all task as complated?") &&
                dispatch({ type: 'toggleAllDone', payload: true })
        } else {
            window.confirm("Are you sure, you want to mark all task as uncomplated?") &&
                dispatch({ type: 'toggleAllDone', payload: false });
        }
    }

    const ClearHandler = () => {
        const confirmation = window.confirm("Are you sure you want to clear all complated tasks?");
        if (confirmation) {
            dispatch({ type: 'clearComplated' })
        }
    }


    return (
        <div className='px-5'>
            <div className='flex justify-between'>
                <button onClick={MarkHandler} className='hover:text-green-900 text-sm cursor-pointer'>Mark All as {havePending ? "completed" : "uncompleted"} </button>
                <button onClick={ClearHandler} className='hover:text-red-500 text-sm cursor-pointer'>Clear Completed Tasks</button>
            </div>
        </div>
    )
}
