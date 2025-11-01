import { useState, useEffect } from 'react'

export default function Clock() {
  const [date, setdate] = useState(new Date())

  useEffect(() => {
    setInterval(() => {
      setdate(new Date())
    }, 1000);
  }, [])

  return (
    <div className=' w-1/2 my-10 flex flex-col '>
      <h1 className='text-2xl font-bold text-gray-500'>Clock</h1>
      <div className='flex flex-row items-end'>
        <h1 className='text-6xl font-bold'>{(date.getHours() < 12) ? date.getHours().toString().padStart(2, '0') : (date.getHours() - 12).toString().padStart(2, '0')}</h1>
        <span className='text-5xl font-bold'> : </span>
        <h1 className='text-6xl font-bold'> {date.getMinutes().toString().padStart(2, '0')}</h1>
        <span className='text-3xl font-bold'>:</span>
        <h3 className='text-3xl font-bold text-red-600'>{date.getSeconds().toString().padStart(2, '0')}</h3>
        <span>{date.getHours() < 12 ? 'am' : 'pm'}</span>
      </div>
    </div>
  )
}
