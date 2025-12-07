export type City = {
  name: string
  latitude: number
  longitude: number
}

export type CitySearchResult = {
  id: number
  name: string
  country?: string
  admin1?: string
  latitude: number
  longitude: number
}
