import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useTodo } from './store';

export default function TaskTemplate({ data2show }) {
    const [tDone, tText, tID] = data2show;
    const { state, dispatch } = useTodo();

    const deleteHandler = () => {
        dispatch({ type: 'removeTask', payload: tID })
    }

    return (
        <div className='bg-white border border-gray-500 rounded-2xl my-2 w-11/12 m-auto h-10 flex justify-around'>
            <input checked={tDone} readOnly
                className='w-4 border-0 outline-0' type="checkbox" />
            <input value={tText} readOnly
                className='w-8/12 border-0 outline-0' type="text" />
            <button className='hover:text-blue-500' ><FaRegEdit size={20} /></button>
            <button onClick={deleteHandler} className='hover:text-red-500' ><MdDeleteOutline size={23} /></button>
        </div>
    )
}
