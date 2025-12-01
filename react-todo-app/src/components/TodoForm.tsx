type TodoFormProps = {
    value: string
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }

export default function TodoForm({value, onSubmit, onChange}: TodoFormProps) {
    return (
        <form
          onSubmit={onSubmit}
          className="grid gap-3 rounded-[28px] border border-white/5 bg-slate-950/60 p-4 shadow-xl shadow-black/40 sm:grid-cols-[1fr_auto] sm:items-center"
        >
            <label className="sr-only" htmlFor="todo-input">
              Add a todo
            </label>
            <input
              id="todo-input"
              type="text"
              value={value}
              placeholder="Add a new todo..."
              className="h-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              onChange={onChange}
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-950/40 transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              Add task
            </button>
        </form>
    )
}
