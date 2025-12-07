import type { CitySearchResult } from '../types/city'

export const fetchSearchCity = async (searchTerm: string) => {
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
