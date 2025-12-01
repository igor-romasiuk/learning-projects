interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchInput = ({ value, onChange, placeholder = 'Search todos' }: SearchInputProps) => (
  <label className="group relative block text-sm font-medium text-slate-300">
    <span className="mb-2 inline-block text-xs uppercase tracking-[0.3em] text-slate-500">Search</span>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={event => onChange(event.target.value)}
      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-10 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
    />

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute bottom-4 left-3 h-4 w-4 text-slate-500"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  </label>
)

export default SearchInput
