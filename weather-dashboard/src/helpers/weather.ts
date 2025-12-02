import { fetchWeatherApi } from "openmeteo";

const url = "https://api.open-meteo.com/v1/forecast";

type FetchWeatherParams = {
    latitude: number
    longitude: number
}

type WeatherData = {
    hourly: {
        time: Date[]
        temperature_2m: number[]
    }
}

export default async function fetchWeather({ latitude, longitude }: FetchWeatherParams): Promise<WeatherData> {
    const params = { latitude, longitude, hourly: 'temperature_2m', timezone: 'auto' } as const

    try {
        const responses = await fetchWeatherApi(url, params)
        const response = responses[0]

        if (!response) throw new Error('No weather data')

        const hourly = response.hourly()
        if (!hourly) throw new Error('No hourly data')

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const start = Number(hourly.time())
        const end = Number(hourly.timeEnd())
        const interval = hourly.interval()

        const temperatureVar = hourly.variables(0)
        if (!temperatureVar) throw new Error('No temperature data')
        const temperatureValues = temperatureVar.valuesArray()
        if (!temperatureValues) throw new Error('No temperature values')

        const weatherData: WeatherData = {
            hourly: {
                time: Array.from(
                    { length: (end - start) / interval },
                    (_, i) => new Date((start + i * interval + utcOffsetSeconds) * 1000)
                ),
                temperature_2m: Array.from(temperatureValues),
            },
        };

        return weatherData

    } catch (error) {
        if (error instanceof Error) throw error
        throw new Error('Request failed')
    }
}
