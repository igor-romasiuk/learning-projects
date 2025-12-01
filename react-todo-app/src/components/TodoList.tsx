import type { Todo } from '../types/todo'

type TodoListprops = {
  todos: Todo[]
  editId: string
  editValue: string
  onToggle: (todo: Todo) => void
  onDelete: (todo: Todo) => void
  onStartEdit: (todo: Todo) => void
  onSaveEdit: (todo: Todo) => void
  onEditValue: (value: string) => void
}

export default function TodoList({
    todos,
    editId,
    editValue,
    onToggle,
    onDelete,
    onStartEdit,
    onSaveEdit,
    onEditValue}: TodoListprops) {
    if (!todos.length) {
      return (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/20 px-6 py-12 text-center text-slate-400">
          <p className="text-lg font-semibold text-slate-200">No todos yet.</p>
          <p className="mt-2 text-sm">Add your first task to start building momentum.</p>
        </div>
      )
    }

    return (
        <ul className="space-y-4">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 shadow-lg shadow-black/20"
            >
              {editId === todo.id ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={editValue}
                    onChange={e => onEditValue(e.target.value)}
                    className="flex-1 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                  />

                  <button
                    type="button"
                    onClick={() => onSaveEdit(todo)}
                    className="rounded-2xl border border-indigo-400/60 px-5 py-2 text-sm font-semibold text-indigo-100 transition hover:border-indigo-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                  >
                    Save
                  </button>
                </div>
              ): (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <label className="flex flex-1 items-start gap-3 text-base text-slate-100">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => onToggle(todo)}
                      className="mt-1 h-5 w-5 rounded border border-white/10 bg-slate-950 text-indigo-400 accent-indigo-400 focus:ring-indigo-400/30"
                    />
                    <p className={`leading-relaxed ${todo.completed ? 'text-slate-500 line-through decoration-indigo-400/60' : ''}`}>
                      {todo.text}
                    </p>
                  </label>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onStartEdit(todo)}
                      className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-indigo-400 hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(todo)}
                      className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:border-rose-400/70 hover:text-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
    )
}
