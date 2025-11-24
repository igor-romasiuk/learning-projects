type Filter = 'all' | 'active' | 'completed'

interface FilterSelectProps {
  value: Filter
  onChange: (value: Filter) => void
}

const FilterSelect = ({ value, onChange }: FilterSelectProps) => (
  <select value={value} onChange={event => onChange(event.target.value as Filter)}>
    <option value="all">All</option>
    <option value="active">Active</option>
    <option value="completed">Completed</option>
  </select>
)

export default FilterSelect
