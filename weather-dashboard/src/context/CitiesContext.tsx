import { createContext, useState, type ReactNode } from "react"
import type { City } from "../types/city"
import { initialCities } from "../constants/cities"


type CitiesContextValue = {
    cities: City[]
    addCity: (city: City) => void
}

export const CitiesContext = createContext<CitiesContextValue | null>(null)

type CitiesProviderProps = {
    children: ReactNode
}

export function CitiesProvider({children}: CitiesProviderProps) {
    const [cities, setCities] = useState<City[]>(initialCities)

    const addCity = (city: City) => {
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

            return [...prev, city]
        })
    }

    const value: CitiesContextValue = {
        cities,
        addCity
    }

    return (
        <CitiesContext.Provider value={value}>
            {children}
        </CitiesContext.Provider>
    )
}
