import React, { useState } from 'react'
import { FaGoogle, FaYoutube } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addSearchHistory } from '../Redux/SearchHistorySlice';
import BookMarks from './BookMarks';
import SearchSuggetions from './SearchSuggetions';


export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setinput] = useState('')
    const [isInputFocused, setisInputFocused] = useState(false)
    let searchString = input.split(" ").join("+")

    // Search on Google
    const searchOnGoogle = () => {
        dispatch(addSearchHistory({ query: input, mode: 'google' }))
        setinput('')
        window.open(`https://www.google.com/search?q=${searchString}`, '_self')
    }

    // Search on youtube
    const searchOnYoutube = () => {
        dispatch(addSearchHistory({ query: input, mode: 'youtube' }))
        setinput('')
        window.open(`https://www.youtube.com/results?search_query=${searchString}`, '_self')
    }

    // Enter Handler
    const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            if (e.ctrlKey) {
                searchOnYoutube()
            } else {
                searchOnGoogle()
            }
        }
    }

    return (
        <div className="min-h-30 min-w-100 p-5 relative">
            <div className="h-10 flex max-w-250 m-auto justify-between">
                <input
                    onKeyDown={enterHandler}
                    onFocus={() => setisInputFocused(true)}
                    onBlur={() => setisInputFocused(false)}
                    type="search"
                    autoComplete='off'
                    onChange={(e) => setinput(e.target.value)}
                    value={input}
                    name="Search"
                    placeholder="Search on Google or Youtube"
                    className="px-5 w-10/12 h-full outline-none border rounded-l-xl"
                />
                <span className="bg-gray-100 w-2/12 flex justify-evenly border rounded-r-xl">
                    <button
                        onClick={searchOnGoogle}
                        className="dark:bg-slate-800 cursor-pointer dark:hover:bg-dark-secondary hover:bg-slate-300 h-full w-6/12 flex justify-center items-center border-r border-slate-400"
                    >
                        <FaGoogle size={22} />
                    </button>
                    <button
                        onClick={searchOnYoutube}
                        className="dark:bg-slate-800 cursor-pointer dark:hover:bg-dark-secondary hover:bg-slate-300 h-full w-6/12 flex justify-center items-center rounded-r-xl"
                    >
                        <FaYoutube size={25} />
                    </button>
                </span>
            </div>
            {
                isInputFocused && <SearchSuggetions />
            }
            <BookMarks />
        </div>
    )
}
