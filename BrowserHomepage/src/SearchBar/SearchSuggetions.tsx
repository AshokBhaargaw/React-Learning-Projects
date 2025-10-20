import { FaYoutube, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../Redux/store';
import { addSearchHistory, removeSearchQuery } from '../Redux/SearchHistorySlice';

export default function SearchSuggetions() {
    const searchHistory = useSelector((state: RootState) => state.hitory.history)
    const dispatch = useDispatch();

    // Search again function
    const searchAgain = (search: { query: string, mode: 'google' | 'youtube' }) => {
        const { query, mode } = search;
        dispatch(removeSearchQuery(query))
        dispatch(addSearchHistory({ query, mode }))
        window.open(`https://www.${mode}.com/search?q=${query}`, '_self')
    }


    return (
        <div className='flex justify-around min-h-30 w-full bg-slate-300 absolute dark:bg-secondary px-5 py-2 rounded'>
            <section className='w-6/12 border-r'>
                <h3 className='font-bold dark:text-slate-300 text-slate-600'>AI Suggetions</h3>
                <ol type="1">
                    <li>Working on it...</li>
                </ol>
            </section>
            <section className='w-6/12 px-2'>
                <h3 className='font-bold dark:text-slate-300 text-slate-600'>History</h3>
                <ul>
                    {
                        searchHistory.map((search, i) => (
                            i < 5 &&
                            <li key={i} className='flex justify-between place-items-center my-2 px-2 cursor-pointer' onClick={()=> searchAgain(search)} >
                                <span className="mr-2">
                                    {search.mode == 'youtube' ? <FaYoutube /> : <FaGoogle />}
                                </span>
                                <input type="text" readOnly className='w-9/12 border-0 outline-0 cursor-pointer' value={search.query} onClick={()=> searchAgain(search)} />
                                <span className='w-2/12'>
                                    <button title="Search again on Google" className='w-6/12 cursor-pointer hover:text-blue-600' onClick={() => (searchAgain({ query: search.query, mode: 'google' }))}><FaGoogle /></button>
                                    <button title="Search again on Youtube" className='w-6/12 cursor-pointer hover:text-red-500' onClick={() => (searchAgain({ query: search.query, mode: 'youtube' }))}><FaYoutube /></button>
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    )
}
