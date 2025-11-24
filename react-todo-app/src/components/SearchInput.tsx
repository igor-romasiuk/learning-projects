interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchInput = ({ value, onChange, placeholder = 'Search todos' }: SearchInputProps) => (
  <input
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={event => onChange(event.target.value)}
  />
)

export default SearchInput
