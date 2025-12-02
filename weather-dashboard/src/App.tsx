import './App.css'
import CityCard from './components/CityCard'

const cities = [
  { name: 'Kyiv', latitude: 50.45, longitude: 30.52 },
  { name: 'Lviv', latitude: 49.84, longitude: 24.03 },
  { name: 'Odesa', latitude: 46.47, longitude: 30.73 },
]

function App() {
  return (
    <div>
      <h1>Weather Dashboard</h1>
      <div>
        {cities.map(city => (
          <CityCard key={city.name} {...city} />
        ))}
      </div>
    </div>
  )
}

export default App
