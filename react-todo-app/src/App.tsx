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
          console.log("Completed");
          
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
    <main>
      <h1>Todo App</h1>

      {loading && (
        <span>Loading...</span>
      )}

      <TodoForm value={value} onSubmit={handleAddTodo} onChange={e => setValue(e.target.value)} />

      <SearchInput value={searchValue} onChange={setSearchValue} />
      <FilterSelect value={filter} onChange={setFilter} />

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

      <Pagination
        currentPage={page}
        paginationRange={paginationRange}
        onPageChange={handlePageChange}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </main>
  )
}

export default App
