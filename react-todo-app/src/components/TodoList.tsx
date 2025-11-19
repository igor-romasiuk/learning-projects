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
    return (
        <>
          {todos.map(todo => (
            <div key={todo.id}>
              {editId === todo.id ? (
                <>
                  <input type="text" value={editValue} onChange={e => onEditValue(e.target.value)} />
    
                  <button onClick={() => onSaveEdit(todo)}>Save</button>
                </>
              ): (
                <>
                  <p>{todo.text}</p>
    
                  <input type="checkbox" checked={todo.completed} onChange={() =>onToggle(todo)} />
    
                  <button onClick={() => onStartEdit(todo)}>Update</button>
                  <button onClick={() => onDelete(todo)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </>
    )
}