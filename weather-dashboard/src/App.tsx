import { useState } from 'react'
import './App.css'
import CityCard from './components/CityCard'
import { useQuery } from '@tanstack/react-query'

const cities = [
  { name: 'Kyiv', latitude: 50.45, longitude: 30.52 },
  { name: 'Lviv', latitude: 49.84, longitude: 24.03 },
  { name: 'Odesa', latitude: 46.47, longitude: 30.73 },
]

type CitySearchResult = {
  id: number
  name: string
  country?: string
  admin1?: string
  latitude: number
  longitude: number
}

function App() {
  const [value, setValue] = useState('')
  const normalizedValue = value.trim().toLowerCase()

  const fetchSearchCity = async (searchTerm: string) => {
    const normalized = searchTerm.trim().toLowerCase()
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(normalized)}&count=5&language=uk`
    )

    if (!response.ok) {
      throw new Error('Failed to load cities')
    }

    const data = await response.json()

    return data as { results?: CitySearchResult[] }
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['city-search', normalizedValue],
    queryFn: () => fetchSearchCity(value),
    enabled: normalizedValue.length >= 2,
  })

  const searchResults = data?.results ?? []
  const shouldShowSuggestions = normalizedValue.length >= 2

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Start typing a city..."
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        {shouldShowSuggestions && (
          <div className="suggestions">
            {isLoading && <p className="suggestion-message">Searching cities…</p>}

            {isError && (
              <p className="suggestion-message suggestion-error">
                {(error instanceof Error && error.message) || 'Something went wrong'}
              </p>
            )}

            {!isLoading && !isError && searchResults.length === 0 && (
              <p className="suggestion-message">No results found</p>
            )}

            {!isLoading && !isError && searchResults.length > 0 && (
              <ul>
                {searchResults.map(result => (
                  <li key={`${result.id}-${result.latitude}-${result.longitude}`}>
                    <button
                      type="button"
                      className="suggestion-item"
                      onClick={() => setValue(result.name)}
                    >
                      <span className="suggestion-primary">{result.name}</span>
                      <span className="suggestion-secondary">
                        {[result.admin1, result.country].filter(Boolean).join(', ') || '—'}
                      </span>
                      <span className="suggestion-meta">
                        {result.latitude.toFixed(2)}°, {result.longitude.toFixed(2)}°
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="cards-grid">
        {cities.map(city => (
          <CityCard key={city.name} {...city} />
        ))}
      </div>
    </div>
  )
}

export default App
