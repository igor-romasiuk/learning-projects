import { useState } from "react"
import type { Todo } from './types/todo'
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

function App() {
  const [value, setValue] = useState<string>('')
  const [editId, setEditId] = useState<string>('')
  const [editValue, setEditValue] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])

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

      <TodoList
        todos={todos} 
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
