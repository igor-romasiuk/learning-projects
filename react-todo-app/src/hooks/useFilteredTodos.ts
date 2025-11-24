import { useMemo } from "react"
import type { Todo } from "../types/todo"

type Filter = 'all' | 'active' | 'completed'

export function useFilteredTodos(todos: Todo[], searchValue: string, filter: Filter) {
  const normalizedSearch = searchValue.trim().toLowerCase()

  return useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = normalizedSearch
        ? todo.text.trim().toLowerCase().includes(normalizedSearch)
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
  }, [todos, normalizedSearch, filter])
}
