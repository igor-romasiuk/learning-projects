import { Link, useParams } from 'react-router-dom'
import { initialCities } from '../constants/cities'
import styles from './CityDetailsPage.module.css'

export default function CityDetailsPage() {
  const { name } = useParams<{ name: string }>()

  const city = initialCities.find(
    c => c.name.toLowerCase() === (name ?? '').toLowerCase()
  )

  if (!city) {
    return (
      <div className={styles.page}>
        <p>City not found</p>
        <Link to="/" className={styles.backLink}>
          ← Back to cities
        </Link>
      </div>
    )
  }

  const sampleConditions = ['Sunny', 'Partly cloudy', 'Light rain', 'Overcast']
  const temperature = Math.round(18 + (city.latitude % 8))
  const feelsLike = temperature + ((Math.round(city.longitude) % 3) - 1)
  const humidity = 45 + (Math.round(city.longitude) % 40)
  const wind = (6 + (city.latitude % 5)).toFixed(1)
  const pressure = 1005 + (Math.round(city.latitude) % 10) * 2
  const visibility = 7 + (Math.round(city.longitude) % 4)
  const uvIndex = 3 + (Math.round(city.latitude) % 6)

  const condition =
    sampleConditions[
      Math.abs(Math.round(city.latitude + city.longitude)) %
        sampleConditions.length
    ]

  const stats = [
    { label: 'Humidity', value: `${humidity}%`, helper: 'Comfortable' },
    { label: 'Wind', value: `${wind} m/s`, helper: 'Gentle breeze' },
    { label: 'Pressure', value: `${pressure} hPa`, helper: 'Stable' },
    { label: 'Visibility', value: `${visibility} km`, helper: 'Clear sky' },
    { label: 'UV Index', value: uvIndex, helper: 'Apply SPF if outdoors' },
  ]

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Back to cities
        </Link>

        <div className={styles.titleGroup}>
          <h2>{city.name}</h2>
          <span>Detailed overview</span>
        </div>
      </header>

      <section className={styles.highlights}>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Current weather</p>
          <div className={styles.summaryTemp}>
            <span className={styles.temperature}>{temperature}°C</span>
            <span className={styles.feels}>
              Feels like {feelsLike}°C · {condition}
            </span>
          </div>

          <div className={styles.summaryMeta}>
            <span>Humidity {humidity}%</span>
            <span>Wind {wind} m/s</span>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {stats.map(stat => (
            <div key={stat.label} className={styles.statCard}>
              <span className={styles.statLabel}>{stat.label}</span>
              <strong className={styles.statValue}>{stat.value}</strong>
              {stat.helper && (
                <span className={styles.statHelper}>{stat.helper}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapHeader}>
          <div>
            <h3>City map</h3>
            <p>Stylized preview of the region</p>
          </div>

          <div className={styles.coordsChip}>
            Lat {city.latitude.toFixed(2)}° · Lon {city.longitude.toFixed(2)}°
          </div>
        </div>

        <div className={styles.mapCard}>
          <div className={styles.mapCanvas}>
            <div className={styles.mapMarker}>
              <span>{city.name}</span>
            </div>
          </div>
        </div>

        <p className={styles.mapHint}>
          Replace this stylized map with a live map component or tiles later on.
        </p>
      </section>
    </div>
  )
}
