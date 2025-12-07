import type { CitySearchResult } from '../types/city'

type CitySearchProps = {
  value: string
  onValueChange: (value: string) => void
  results: CitySearchResult[]
  isLoading: boolean
  isError: boolean
  error: unknown
  shouldShowSuggestions: boolean
  onSelectSuggestion: (city: CitySearchResult) => void
  onAddCity: (city: CitySearchResult) => void
}

export default function CitySearch({
  value,
  onValueChange,
  results,
  isLoading,
  isError,
  error,
  shouldShowSuggestions,
  onSelectSuggestion,
  onAddCity,
}: CitySearchProps) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Start typing a city..."
        value={value}
        onChange={e => onValueChange(e.target.value)}
      />

      {shouldShowSuggestions && (
        <div className="suggestions">
          {isLoading && <p className="suggestion-message">Searching cities…</p>}

          {isError && (
            <p className="suggestion-message suggestion-error">
              {(error instanceof Error && error.message) || 'Something went wrong'}
            </p>
          )}

          {!isLoading && !isError && results.length === 0 && (
            <p className="suggestion-message">No results found</p>
          )}

          {!isLoading && !isError && results.length > 0 && (
            <ul>
              {results.map(result => (
                <li key={`${result.id}-${result.latitude}-${result.longitude}`}>
                  <button
                    type="button"
                    className="suggestion-item"
                    onClick={() => onSelectSuggestion(result)}
                  >
                    <span className="suggestion-primary">{result.name}</span>
                    <span className="suggestion-secondary">
                      {[result.admin1, result.country].filter(Boolean).join(', ') || '—'}
                    </span>
                    <span className="suggestion-meta">
                      {result.latitude.toFixed(2)}°, {result.longitude.toFixed(2)}°
                    </span>
                  </button>
                  <button onClick={() => onAddCity(result)}>Add</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
