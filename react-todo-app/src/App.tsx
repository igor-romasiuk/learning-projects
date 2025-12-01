import { useEffect, useState } from "react"
import type { Todo } from './types/todo'
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import Pagination from "./components/Pagination"
import SearchInput from "./components/SearchInput"
import FilterSelect from "./components/FilterSelect"
import { loadStoredTodos, saveTodos } from "./utils/todoStorage"
import { usePagination } from "./hooks/usePagination"
import { useDebouncedValue } from "./hooks/useDebouncedValue"
import { useFilteredTodos } from "./hooks/useFilteredTodos"

const PAGE_SIZE = 5

function App() {
  const [value, setValue] = useState<string>('')
  const [editId, setEditId] = useState<string>('')
  const [editValue, setEditValue] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>(loadStoredTodos)
  const [searchValue, setSearchValue] = useState<string>('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [loading, setLoading] = useState<boolean>(false)
  const debouncedSearch = useDebouncedValue(searchValue.trim().toLowerCase())
  const visibleTodos = useFilteredTodos(todos, debouncedSearch, filter)
  const {
    page,
    paginationRange,
    handlePageChange,
    setTotalItems,
    isFirstPage,
    isLastPage,
  } = usePagination({ pageSize: PAGE_SIZE })

  const todosUrl = `https://jsonplaceholder.typicode.com/todos?_limit=${PAGE_SIZE}&_page=${page}`

  useEffect(() => {
    const controller = new AbortController()

    const loadTodos = async () => {
      setLoading(true)

      try {
        const response = await fetch(todosUrl,  { signal: controller.signal })

        if (!response.ok) throw new Error('Request faild')

        const data: Array<{id: number, title: string, completed: boolean}> = await response.json()
        const totalFromHeader = Number(response.headers.get('x-total-count'))
        const totalCount = Number.isFinite(totalFromHeader) ? totalFromHeader : data.length
        setTotalItems(totalCount)

        setTodos(
          data.map(todo => ({
            id: todo.id.toString(),
            text: todo.title,
            completed: todo.completed
          }))
        )
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {

          return
        }
      } finally {
        setLoading(false)
      }
    }

    loadTodos()

    return () => {
      controller.abort()
    }
  }, [todosUrl])

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTodo = {
      id: Date.now().toString(),
      text: value,
      completed: false
    }

    if (!newTodo.text) return 'Write your todo'

    setTodos([...todos, newTodo])
    setValue('')
  }

  const handleDeleteTodo = (todo: Todo) => {
    const filteredTodo = todos.filter(item => item.id !== todo.id)

    setTodos(filteredTodo)
  }

  const handleCompleteTodo = (todo: Todo) => {
    setTodos(
      todos.map(item => {
        if (item.id === todo.id) {
          return {...item, completed: !item.completed}
        } else {
          return item
        }
      })
    )
  }

  const startUpdateTodo = (todo: Todo) => {
    setEditId(todo.id)
    setEditValue(todo.text)
  }

  const handleEditTodo = (todo: Todo) => {
    setTodos (
      todos.map(item => {
        if (item.id === todo.id) {
          return {...item, text: editValue}
        } else {
          return item
        }
      })
    )

    setEditId('')
    setEditValue('')
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-[32px] border border-white/5 bg-slate-900/50 p-8 shadow-[0_25px_120px_-45px_rgba(15,23,42,1)] backdrop-blur-xl lg:p-10">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-indigo-300/80">Stay organized</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Todo App</h1>
          <p className="mt-3 text-base text-slate-300">
            Capture your ideas, focus on one task at a time, and celebrate the wins.
          </p>
        </header>

        <section className="space-y-5">
          <TodoForm value={value} onSubmit={handleAddTodo} onChange={e => setValue(e.target.value)} />

          <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <SearchInput value={searchValue} onChange={setSearchValue} />
            <FilterSelect value={filter} onChange={setFilter} />
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/5 bg-slate-950/60 p-6 shadow-inner shadow-black/40">
          <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
            <p>
              Showing <span className="font-semibold text-slate-100">{visibleTodos.length}</span> todos
            </p>
            {loading && <span className="animate-pulse text-indigo-300">Loading fresh todos...</span>}
          </div>

          <TodoList
            todos={visibleTodos}
            editId={editId}
            editValue={editValue}
            onToggle={handleCompleteTodo}
            onDelete={handleDeleteTodo}
            onStartEdit={startUpdateTodo}
            onSaveEdit={handleEditTodo}
            onEditValue={setEditValue}
          />
        </section>

        <Pagination
          currentPage={page}
          paginationRange={paginationRange}
          onPageChange={handlePageChange}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
      </div>
    </main>
  )
}

export default App
