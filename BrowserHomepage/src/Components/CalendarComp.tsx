import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'


export default function CalendarComp() {

  const [date, setDate] = useState(new Date())

  return (
    <div className='w-1/2'>
      <div className='w-11/12'>
        <Calendar
          value={date}
          onChange={() => { }}
          tileDisabled={() => true}
          prevLabel="«"
          nextLabel="»"
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={true}
          minDetail="month"
          maxDetail="month"
        />
      </div>
    </div>
  )
}
