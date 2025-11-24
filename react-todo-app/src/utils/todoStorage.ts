import type { Todo } from "../types/todo"

const STORAGE_KEY = 'react-todos'

export function loadStoredTodos(): Todo[] {
  const saved = localStorage.getItem(STORAGE_KEY)

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

export function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}
