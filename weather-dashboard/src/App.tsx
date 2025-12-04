import { useState } from 'react'
import './App.css'
import CityCard from './components/CityCard'
import { useQuery } from '@tanstack/react-query'

const cities = [
  { name: 'Kyiv', latitude: 50.45, longitude: 30.52 },
  { name: 'Lviv', latitude: 49.84, longitude: 24.03 },
  { name: 'Odesa', latitude: 46.47, longitude: 30.73 },
]

function App() {
  const [value, setValue] = useState('')

  const fetchSearchCity = async () => {
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(value.trim().toLowerCase())}&count=5&language=uk`)

      const data = await response.json()

      return data
    } catch (error) {
      if (error instanceof Error) throw error
        throw new Error('Request failed')
    }
  }

  const {data, isLoading} = useQuery({
    queryKey: ['city-search', value.trim().toLowerCase()],
    queryFn: () => fetchSearchCity(),
    enabled: value.length >= 2,
  })

  return (
    <div>
      <h1>Weather Dashboard</h1>

      <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
      <ul>
        <li></li>
      </ul>

      <div>
        {cities.map(city => (
          <CityCard key={city.name} {...city} />
        ))}
      </div>
    </div>
  )
}

export default App
