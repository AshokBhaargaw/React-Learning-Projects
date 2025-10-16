import React, { useEffect, useState, useRef } from 'react'
import { FaSearch } from "react-icons/fa";

export default function App() {

  const [weartherData, setWeartherData] = useState(false)
  const [city, setCity] = useState("Ramdevra")
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url);
      const data = await response.json();
      setWeartherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temp: data.main.temp,
        location: data.name,
        icon: data.weather[0].icon
      })
    } catch (error) {
      console.log(error);
    }
  }
  const inputRef = useRef()

  useEffect(() => {
    search(city)
  }, [city])

  return (
    <div className='bg-slate-950 h-screen flex justify-center align-self place-items-center text-white'>
      <div className='h-130 w-100 bg-gradient-to-r from-purple-500 to-pink-500 text-black rounded-2xl'>
        <h1 className='my-3 font-bold text-2xl text-center text-slate-300'>Weather App</h1>
        <hr />
        <div className='bg-white border-1 w-10/12 m-auto my-3 flex justify-evenly rounded-xl h-9'>
          <input type="search" ref={inputRef} placeholder='Search' className='w-10/12 outline-0' />
          <button className='cursor-pointer' type='submit' onClick={() => setCity(inputRef.current.value)}><FaSearch /></button>
        </div>
        <div className='flex flex-col place-items-center justify-center my-5'>
          <img className='h-30' src={`https://openweathermap.org/img/wn/${weartherData.icon}.png`} alt="ICON" />
          <h1 className='text-white font-bold text-5xl'>{weartherData.temp} C</h1>
          <h2 className='text-white font-semibold text-5xl'>{weartherData.location}</h2>
        </div>
        <div className='flex justify-around mt-15'>
          <span className='flex justify-around place-items-center gap-3'>
            <img className='h-7' src="../Assets/WeatherImgs/humidity.png" />
            <span>
              <p className='m-0 text-white text-sm p-0'>90%</p>
              <p className='m-0 text-white text-xs p-0'>Huminity</p>
            </span>
          </span>
          <span className='flex justify-around place-items-center gap-3'>
            <img className='h-7' src="../Assets/WeatherImgs/wind.png" />
            <span>
              <p className='m-0 text-white text-sm p-0'>{weartherData.windspeed} Km/h</p>
              <p className='m-0 text-white text-xs p-0'>Wind Speed</p>
            </span>
          </span>

        </div>
      </div>
    </div>
  )
}
