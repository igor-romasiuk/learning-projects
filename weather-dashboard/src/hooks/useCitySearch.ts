import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchSearchCity } from '../helpers/citySearch'
import type { CitySearchResult } from '../types/city'

const MIN_QUERY_LENGTH = 2

type UseCitySearchResult = {
  results: CitySearchResult[]
  shouldShowSuggestions: boolean
} & UseQueryResult<{ results?: CitySearchResult[] }, Error>

export default function useCitySearch(searchTerm: string): UseCitySearchResult {
  const normalizedValue = searchTerm.trim().toLowerCase()

  const query = useQuery({
    queryKey: ['city-search', normalizedValue],
    queryFn: () => fetchSearchCity(searchTerm),
    enabled: normalizedValue.length >= MIN_QUERY_LENGTH,
  })

  const results = query.data?.results ?? []
  const shouldShowSuggestions = normalizedValue.length >= MIN_QUERY_LENGTH

  return {
    ...query,
    results,
    shouldShowSuggestions,
  }
}
