import { Link, useParams } from 'react-router-dom'
import { initialCities } from '../constants/cities'

export default function CityDetailsPage() {
  const { name } = useParams<{ name: string }>()

  const city = initialCities.find(
    c => c.name.toLowerCase() === (name ?? '').toLowerCase()
  )

  if (!city) {
    return (
      <div>
        <p>City not found</p>
        <Link to="/">← Back to cities</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/">← Back to cities</Link>
      <h2>{city.name}</h2>
      <p>
        Coordinates: {city.latitude}°, {city.longitude}°
      </p>
      <p>Here you can show detailed weather and other info.</p>
    </div>
  )
}
