import { useState } from 'react'
import { Link } from 'react-router-dom'
import CityCard from '../components/CityCard'
import CitySearch from '../components/CitySearch'
import Pagination from '../components/Pagination'
import { initialCities } from '../constants/cities'
import useCitySearch from '../hooks/useCitySearch'
import useDebounce from '../hooks/useDebounce'
import usePagination from '../hooks/usePagination'
import type { CitySearchResult } from '../types/city'

export default function DashboardPage() {
  const [value, setValue] = useState('')
  const [cities, setCities] = useState(initialCities)
  const debouncedValue = useDebounce(value, 300)

  const {
    results,
    shouldShowSuggestions,
    isLoading,
    isError,
    error,
  } = useCitySearch(debouncedValue)

  const {
    items: paginatedCities,
    page,
    totalPages,
    hasPrev,
    hasNext,
    goToPrev,
    goToNext,
    goToPage,
  } = usePagination(cities, 6)

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
    <>
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
        {paginatedCities.map(city => (
          <Link
            key={city.name}
            to={`/city/${encodeURIComponent(city.name)}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <CityCard {...city} />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          hasPrev={hasPrev}
          hasNext={hasNext}
          goToPrev={goToPrev}
          goToNext={goToNext}
          goToPage={goToPage}
        />
      )}
    </>
  )
}
