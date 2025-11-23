import { useEffect, useState } from "react"
import type { Todo } from './types/todo'
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

function App() {
  const [value, setValue] = useState<string>('')
  const [editId, setEditId] = useState<string>('')
  const [editValue, setEditValue] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>(loadStoredTodos)
  const [searchValue, setSearchValue] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const todosUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=5'

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetch(todosUrl)

        if (!response.ok) throw new Error('Request faild')

        const data: Array<{id: number, title: string, completed: boolean}> = await response.json()

        setTodos(
          data.map(todo => ({
            id: todo.id.toString(),
            text: todo.title,
            completed: todo.completed
          }))
        )
      } catch (error) {
        console.log(error);
      }
    }

    loadTodos()
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchValue.trim().toLowerCase())
    }, 300)

    return () => window.clearTimeout(timer)
  }, [searchValue])

  const visibleTodos = todos.filter(todo => {
    const matchesSearch = debouncedSearch
      ? todo.text.trim().toLocaleLowerCase().includes(debouncedSearch)
      : true
    
    if (!matchesSearch) return false
    
    switch (filter) {
      case 'active':
        return !todo.completed
        
      case 'completed':
        return todo.completed
    
      default:
        return true
    }
  })

  function loadStoredTodos(): Todo[] {
    const saved = localStorage.getItem('react-todos')

    if (!saved) return []

    try {
      const parsed: unknown = JSON.parse(saved)

      if (Array.isArray(parsed)) {
        return parsed as Todo[]
      }
    } catch (error) {
      console.log(error);
    }

    return []
  }
  
  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos))
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

      <TodoForm value={value} onSubmit={handleAddTodo} onChange={e => setValue(e.target.value)} />

      <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
      <select value={filter} onChange={e => setFilter(e.target.value as typeof filter)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

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
    </main>
  )
}

export default App
