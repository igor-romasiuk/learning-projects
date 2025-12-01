type Filter = 'all' | 'active' | 'completed'

interface FilterSelectProps {
  value: Filter
  onChange: (value: Filter) => void
}

const FilterSelect = ({ value, onChange }: FilterSelectProps) => (
  <label className="text-sm font-medium text-slate-300">
    <span className="mb-2 inline-block text-xs uppercase tracking-[0.3em] text-slate-500">Filter</span>
    <select
      value={value}
      onChange={event => onChange(event.target.value as Filter)}
      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-base text-slate-100 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  </label>
)

export default FilterSelect
