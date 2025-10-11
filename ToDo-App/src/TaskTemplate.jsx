import React, { useEffect, useRef, useState } from 'react'
import { FaRegEdit, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useTodo } from './store';

export default function TaskTemplate({ data2show }) {
    const [tDone, tText, tID] = data2show;
    const timeofCreation = new Date(tID)
    const { dispatch } = useTodo();
    const [updatedTxt, setUpdatedTxt] = useState(tText)

    // make text editable
    const [editable, setEditable] = useState(false)
    const taskText = useRef();
    editable ? taskText.current.focus() : null;

    // updating current task's text
    const updateHandler = (e) => {
        setUpdatedTxt(e.target.value)
        dispatch({ type: 'updateTask', payload: { id: tID, text: e.target.value } })
    }

    // deleting task
    const deleteHandler = () => {
        dispatch({ type: 'removeTask', payload: tID })
    }

    return (
        <div className={`border border-gray-500 rounded-2xl my-2 w-11/12 m-auto h-15 flex justify-around ${tDone ? "bg-gray-200 border-green-500" : "bg-white border-red-300"}`} >
            <input checked={tDone} onChange={() => dispatch({ type: 'toggleDone', payload: { id: tID, done: !tDone } })}
                className='w-4 border-0 outline-0 cursor-pointer' type="checkbox" />
            <div>
                <input onChange={updateHandler} value={updatedTxt} readOnly={!editable}
                    className='  mt-2 text-2xl border-0 outline-0' type="text" ref={taskText} />
                <p className='text-xs text-gray-600 ' >Created on: {timeofCreation.toLocaleString()}</p>
            </div>
            <button onClick={() => setEditable(!editable)} className='hover:text-blue-500 outline-0' >{editable ? <FaEdit size={20} /> : <FaRegEdit size={20} />}</button>
            <button onClick={deleteHandler} className='hover:text-red-500' ><MdDeleteOutline size={23} /></button>
        </div >
    )
}