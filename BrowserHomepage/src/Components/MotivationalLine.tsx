import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MotivationalLine() {
    const [motivation, setMotivation] = useState('')

    useEffect(() => {
        const getMotivation = async () => {
            try {
                const res = await axios.get('https://stoic-quotes.com/api/quote')
                setMotivation(res.data.text)
            } catch (err) {
                setMotivation("Life is slavery if the courage to die is absent.")
                console.error("error", err)
            }
        }
        getMotivation();
    }, [])

    return <div> {motivation} </div>
}