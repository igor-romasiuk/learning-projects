import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CityCard from '../components/CityCard'
import CitySearch from '../components/CitySearch'
import Pagination from '../components/Pagination'
import { initialCities } from '../constants/cities'
import useCitySearch from '../hooks/useCitySearch'
import useDebounce from '../hooks/useDebounce'
import usePagination from '../hooks/usePagination'
import type { CitySearchResult } from '../types/city'
import { useCities } from '../hooks/useCities'

export default function DashboardPage() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 300)
  const [searchParams, setSearchParams] = useSearchParams()
  const {cities, addCity} = useCities()

  const pageFromUrl = Number(searchParams.get('page') ?? 1)

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
  } = usePagination(cities, 6, pageFromUrl)

  const handleGoToPage = (value: number) => {
    setSearchParams({page: String(value)})
    goToPage(value)
  }

  const handleGoToNext = () => {
    setSearchParams({ page: String(page + 1) })
    goToNext()
  }

  const handleGoToPrev = () => {
    setSearchParams({ page: String(page - 1) })
    goToPrev()
  }

  const handleAddCity = (city: CitySearchResult) => {
    addCity({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
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
          goToPrev={handleGoToPrev}
          goToNext={handleGoToNext}
          goToPage={handleGoToPage}
        />
      )}
    </>
  )
}
