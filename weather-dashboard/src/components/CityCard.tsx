import { useQuery } from '@tanstack/react-query'
import fetchWeather from '../helpers/weather'

type CityCardProps = {
  name: string
  latitude: number
  longitude: number
}

export default function CityCard({ name, latitude, longitude }: CityCardProps) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => fetchWeather({ latitude, longitude }),
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) {
    return <div>Loading {name}...</div>
  }

  if (isError || !data) {
    return (
      <div>
        <p>Failed to load weather for {name}</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    )
  }

  const temperature = data.hourly.temperature_2m[0]
  const nextTemperature = data.hourly.temperature_2m[1]
  const trend = typeof nextTemperature === 'number' ? nextTemperature - temperature : 0
  const time = data.hourly.time[0]

  return (
    <div>
      <h2>{name}</h2>
      <p>{time.toLocaleString()}</p>
      <p>Current temperature: {temperature.toFixed(1)}°C</p>
      {typeof nextTemperature === 'number' && (
        <p>
          Next hour: {nextTemperature.toFixed(1)}°C ({trend > 0 ? '+' : ''}
          {trend.toFixed(1)}° trend)
        </p>
      )}
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  )
}
