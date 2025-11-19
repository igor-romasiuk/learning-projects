import { useState } from "react"

type Todo = {
  id: string,
  text: string,
  completed: boolean
}

function App() {
  const [value, setValue] = useState<string>('')
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

  return (
    <main>
      <h1>Todo App</h1>

      <form action="post" method="post" onSubmit={handleAddTodo}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />

        <button type="submit">Add</button>
      </form>

      {todos.map(todo => (
        <div key={todo.id}>
          <p>{todo.text}</p>

          <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
        </div>
      ))}
    </main>
  )
}

export default App
