import { useState } from 'react'
import { FaGoogle, FaLinkedin, FaYoutube, FaInstagram, FaGithub, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaEarthAsia } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import type { RootState } from '../Redux/store'



export default function SearchBar() {
    const [input, setinput] = useState('')
    let searchString = input.split(" ").join("+")
    const currentMode = useSelector((state: RootState) => state.theme.mode);

    console.log(currentMode);

    const searchOnGoogle = () => {
        window.open(`https://www.google.com/search?q=${searchString}`)
        setinput('')
    }

    const searchOnYoutube = () => {
        window.open(`https://www.youtube.com/results?search_query=${searchString}`)
        setinput('')
    }

    return (
        <div className="min-h-30 min-w-100 p-5">
            <div className="h-10 flex max-w-250 m-auto justify-between">
                <input
                    type="search"
                    onChange={(e) => setinput(e.target.value)}
                    value={input}
                    name="Search"
                    placeholder="Search on Google or Youtube"
                    className="px-5 w-10/12 h-full outline-none border rounded-l-xl"
                />
                <span className="bg-gray-100 w-2/12 flex justify-evenly border rounded-r-xl">
                    <button
                        onClick={searchOnGoogle}
                        className="dark:bg-slate-800 cursor-pointer hover:bg-slate-300 h-full w-6/12 flex justify-center items-center border-r border-slate-400"
                    >
                        <FaGoogle size={22} />
                    </button>
                    <button
                        onClick={searchOnYoutube}
                        className="dark:bg-slate-800 cursor-pointer hover:bg-slate-300 h-full w-6/12 flex justify-center items-center rounded-r-xl"
                    >
                        <FaYoutube size={25} />
                    </button>
                </span>
            </div>


            <div className="flex justify-center gap-5 mt-5">

                <a href="https://www.linkedin.com/in/ashokbhaargaw/" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                    <FaLinkedin size={28} color="#4285F4" />
                    <label className='text-slate-500 text-sm dark:text-slate-300'>LinkedIn </label>
                </a>
                <a href="https://www.facebook.com/ashokbhaargaw/" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                    <FaFacebook size={28} color="#4285F4" />
                    <label className='text-slate-500 text-sm dark:text-slate-300'>Facebook </label>
                </a>
                <a href="https://www.instagram.com/dev.ashokbhaargaw/" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                    <FaInstagram size={28} color="#E1306C" />
                    <label className='text-slate-500 text-sm dark:text-slate-300'>Instagram </label>
                </a>
                <a href="https://github.com/AshokBhaargaw/" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                    <FaGithub size={28} color={currentMode == 'light' ? "#000000" : "#eee"} />
                    <label className='text-slate-500 text-sm dark:text-slate-300'>Github </label>
                </a>
                <a href="https://x.com/AshokBhaargaw" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                    <FaXTwitter size={28} color={currentMode == 'light' ? "#000000" : "#eee"} />
                    <label className='text-slate-500 text-sm dark:text-slate-300'>Twitter </label>
                </a>
                <a href="https://www.naukri.com/" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                    <FaEarthAsia size={28} color={currentMode == 'light' ? "#000000" : "#eee"} />
                    <label className='text-slate-500 text-sm dark:text-slate-300'>Naukri.com </label>
                </a>
            </div>
        </div>
    )
}
