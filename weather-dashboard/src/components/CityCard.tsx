import { useQuery } from '@tanstack/react-query'
import fetchWeather from '../helpers/weather'
import type { City } from '../types/city'
import styles from './CityCard.module.css'

export default function CityCard({ name, latitude, longitude }: City) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => fetchWeather({ latitude, longitude }),
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <div className={styles.stateCard}>
        <p>Loading weather for {name}…</p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className={styles.stateCard}>
        <p>Failed to load weather for {name}</p>
        <button className={styles.retryButton} onClick={() => refetch()}>
          Try again
        </button>
      </div>
    )
  }

  const temperature = data.hourly.temperature_2m[0]
  const nextTemperature = data.hourly.temperature_2m[1]
  const trend = typeof nextTemperature === 'number' ? nextTemperature - temperature : 0
  const time = data.hourly.time[0]

  const parsedDate = new Date(time)
  const displayTime = Number.isNaN(parsedDate.getTime()) ? String(time) : parsedDate.toLocaleString()

  const trendClass =
    trend > 0 ? styles.trendPositive : trend < 0 ? styles.trendNegative : styles.trendNeutral

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cityName}>{name}</h2>
        <p className={styles.timestamp}>{displayTime}</p>
      </div>

      <div className={styles.stats}>
        <p className={styles.currentTemp}>{temperature.toFixed(1)}°C</p>
        {typeof nextTemperature === 'number' && (
          <p className={`${styles.trend} ${trendClass}`}>
            Next hour: {nextTemperature.toFixed(1)}°C ({trend > 0 ? '+' : ''}
            {trend.toFixed(1)}° trend)
          </p>
        )}
      </div>

      <button className={styles.refreshButton} onClick={() => refetch()}>
        Refresh
      </button>
    </div>
  )
}
