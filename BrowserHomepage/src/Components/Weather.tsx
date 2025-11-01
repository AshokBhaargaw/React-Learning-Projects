import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";


export default function Weather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Ramdevra&units=metric&appid=${import.meta.env.VITE_APP_ID}`
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(url)
        setData(res.data)
      } catch (error) {
        console.log("failed to laod weather data")
      }
      finally {
        setLoading(false)
      }
    }
    fetchWeather();
  }, [])

  const timeConvertor = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <div className='w-1/2 h-50 '>
      <div className="w-10/12 flex justify-center place-items-center flex-col shadow-[0_2px_8px_rgba(0,0,0,0.2)] p-3 dark:bg-[#1e293b] rounded-2xl h-full">
        <div className='w-full flex flex-col justify-between place-items-center mb-3'>
          <h2 className='text-l font-bold text-gray-500 dark:text-gray-200 text-center'>Today's Weather</h2>
          <span className='text-s text-gray-400'>
            {loading ? "Loading..." : data?.weather[0].description}
          </span>
        </div>
        <div className='flex justify-between w-full'>
          <span className='flex flex-col'>
            <p className='text-xs text-gray-400' style={{ marginBottom: -5 }}>Sunrise</p>
            <p className='text-gray-500 font-bold'>{timeConvertor(data?.sys.sunrise)} </p>
          </span>
          <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} width={50} />
          <span className='flex flex-col'>
            <p className='text-xs text-gray-400' style={{ marginBottom: -5 }}>Sunset</p>
            <p className='text-gray-500 font-bold'>{timeConvertor(data?.sys.sunset)} </p>
          </span>
        </div>
        <div className='w-full flex justify-between mt-5'>
          <div className='flex flex-col'>
            <div className='flex justify-between place-items-center ' >
              <h3 className='text-4xl font-bold text-gray-700 dark:text-gray-200'> {Math.round(data?.main.temp)} </h3>
              <div>
                <div className='flex place-items-center text-gray-400' style={{ marginBottom: -9 }}>
                  <FaArrowUp size={10} />
                  <p className='text-s'>{Math.floor(data?.main.temp_max)} </p>
                </div>
                <div className='flex place-items-center text-gray-400' style={{ marginTop: -9 }}>
                  <FaArrowDown size={10} />
                  <p className='text-s '>{Math.floor(data?.main.temp_min)} </p>
                </div>
              </div>
            </div>
            <div className='text-sm text-gray-400 text-center' style={{ marginTop: -5 }}>
              Temprature
            </div>
          </div>
          <div>
            <div className='flex justity-center place-items-center gap-2 text-xl' style={{ marginBottom: -5 }}>
              <WiHumidity size={20} />
              <p>{data?.main.humidity} </p>
            </div>
            <div className='flex justity-center place-items-center gap-2 text-xl' style={{ marginTop: -5 }}>
              <FaWind size={20} />
              <p>{data?.wind.speed} </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
