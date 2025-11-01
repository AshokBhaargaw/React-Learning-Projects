
import { useEffect, useState } from 'react'

export default function LivableClock() {
    const [current, setCurrent] = useState(new Date())
    const workableLife = new Date(2053, 5, 9);
    useEffect(() => {
        setInterval(() => {
            setCurrent(new Date())
        }, 1000);
    }, [])

    let livable = workableLife.getTime() - current.getTime();
    const totalDays = livable / (1000 * 60 * 60 * 24);
    const years = Math.floor(totalDays / 365.25);
    const remainingDaysAfterYears = totalDays - (years * 365.25);
    const months = Math.floor(remainingDaysAfterYears / 30.44);
    const days = Math.floor(remainingDaysAfterYears % 30.44);


    return (
        <div className='w-1/2 my-10 flex flex-col'>
            <h1 className='text-2xl font-bold text-gray-500'>Livable Life</h1>
            <div className='flex flex-row text-red-600'>
                <div className='flex flex-col place-items-center'>
                    <h1 className='text-5xl font-bold ' style={{ marginBottom: -8 }}>{years}</h1>
                    <span className='text-s font-bold w-full'> years </span>
                </div>
                <span className='text-4xl font-extrabold mx-1'>:</span>
                <div className='flex flex-col place-items-center'>
                    <h1 className='text-5xl font-bold ' style={{ marginBottom: -8 }}>{months.toString().padStart(2, '0')}</h1>
                    <span className='text-s font-bold w-full'> months </span>
                </div>

                <span className='text-4xl font-extrabold mx-1'>:</span>
                <div className='flex flex-col place-items-center'>
                    <h1 className='text-5xl font-bold ' style={{ marginBottom: -8 }}>{days.toString().padStart(2, '0')}</h1>
                    <span className='text-s font-bold w-full'> days </span>
                </div>
            </div>
        </div>
    )
}
