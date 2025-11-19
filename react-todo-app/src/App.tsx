import { useState } from "react"

type Todo = {
  id: string,
  text: string,
  completed: boolean
}

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

      <form action="post" method="post" onSubmit={handleAddTodo}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />

        <button type="submit">Add</button>
      </form>

      {todos.map(todo => (
        <div key={todo.id}>
          {editId === todo.id ? (
            <>
              <input type="text" value={editValue} onChange={e => setEditValue(e.target.value)} />

              <button onClick={() => handleEditTodo(todo)}>Save</button>
            </>
          ): (
            <>
              <p>{todo.text}</p>

              <input type="checkbox" checked={todo.completed} onChange={() =>handleCompleteTodo(todo)} />

              <button onClick={() => startUpdateTodo(todo)}>Update</button>
              <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </main>
  )
}

export default App
