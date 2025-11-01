import SearchBar from './SearchBar/SearchBar'
import Header from './Header/Header'
import Taskmanager from './TaskManager/Taskmanager'
import Weather from './Components/Weather'
import Clock from './Components/Clock'
import CalendarComp from './Components/CalendarComp'
import LivableClock from './Components/LivableClock'
import MotivationalLine from './Components/MotivationalLine'

export default function App() {

  return (
    <div >
      <div className='min-h-screen overflow-hidden p-0 max-w-10/12 m-auto'>
        <Header />
        <SearchBar />
        <div className='w-full flex justify-around'>
          <div className='w-1/2'>
            <Taskmanager />
          </div>
          <div className='w-1/2'>
            <div className='flex justify-center place-items-center '>
              <Clock />
              <LivableClock />
            </div>
            <div className='flex justify-between min-h-50'>
              <CalendarComp />
              <Weather />
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-5'>
          <MotivationalLine/>
        </div>
      </div>
    </div>
  )
}
