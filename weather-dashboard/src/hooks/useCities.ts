import { useContext } from "react"
import { CitiesContext } from "../context/CitiesContext"

export function useCities() {
    const ctx = useContext(CitiesContext)
  
    if (!ctx) {
      throw new Error('useCities must be used within a CitiesProvider')
    }
  
    return ctx
}
