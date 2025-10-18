import { useState } from 'react'
import { FaGoogle, FaYoutube } from "react-icons/fa";

export default function SearchBar() {
    const [input, setinput] = useState('')
    let searchString = input.split(" ").join("+")

    const searchOnGoogle = () => {
        window.open(`https://www.google.com/search?q=${searchString}`)
    }

    const searchOnYoutube = () => {
        window.open(`https://www.youtube.com/results?search_query=${searchString}`, '_blank');
    }
    return (
        <div className='min-h-30 min-w-100'>
            <div className='h-10 flex max-w-250 m-auto justify-between'>
                <input type="search" onChange={(e) => setinput(e.target.value)} value={input} name="Search" placeholder='Search on Google or Youtube' className='px-5 w-10/12 h-full outline-none border rounded-l-xl' />
                <span className='bg-gray-100 w-2/12 flex justify-evenly border rounded-r-xl'>
                    <button onClick={searchOnGoogle} className='cursor-pointer hover:bg-slate-300 h-full w-6/12 flex justify-center place-items-center border-r border-slate-400' ><FaGoogle size={22} /></button>
                    <button onClick={searchOnYoutube} className='cursor-pointer hover:bg-slate-300 h-full w-6/12 flex justify-center place-items-center rounded-r-xl' ><FaYoutube size={25} /></button>
                </span>
            </div>
        </div>
    )
}
