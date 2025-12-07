import { useState } from 'react'
import './App.css'
import CityCard from './components/CityCard'
import CitySearch from './components/CitySearch'
import { initialCities } from './constants/cities'
import useCitySearch from './hooks/useCitySearch'
import type { CitySearchResult } from './types/city'
import useDebounce from './hooks/useDebounce'

function App() {
  const [value, setValue] = useState('')
  const [cities, setCities] = useState(initialCities)
  const debouncedValue = useDebounce(value, 300)
  const { results, shouldShowSuggestions, isLoading, isError, error } = useCitySearch(debouncedValue)

  const handleAddCity = (city: CitySearchResult) => {
    setCities(prev => {
      const alreadyAdded = prev.some(
        existing =>
          existing.name === city.name &&
          existing.latitude === city.latitude &&
          existing.longitude === city.longitude
      )

      if (alreadyAdded) {
        return prev
      }

      return [
        ...prev,
        {
          name: city.name,
          latitude: city.latitude,
          longitude: city.longitude,
        },
      ]
    })
    setValue('')
  }

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <CitySearch
        value={value}
        onValueChange={setValue}
        results={results}
        isLoading={isLoading}
        isError={isError}
        error={error}
        shouldShowSuggestions={shouldShowSuggestions}
        onSelectSuggestion={city => setValue(city.name)}
        onAddCity={handleAddCity}
      />

      <div className="cards-grid">
        {cities.map(city => (
          <CityCard key={city.name} {...city} />
        ))}
      </div>
    </div>
  )
}

export default App
