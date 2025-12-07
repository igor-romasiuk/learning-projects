export type PaginatedResult<T> = {
    items: T[]
    page: number
    totalPages: number
    hasPrev: boolean
    hasNext: boolean
  }
  
  export function paginate<T>(
    items: T[],
    page: number,
    pageSize: number
  ): PaginatedResult<T> {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const start = (safePage - 1) * pageSize
    const pageItems = items.slice(start, start + pageSize)
  
    return {
      items: pageItems,
      page: safePage,
      totalPages,
      hasPrev: safePage > 1,
      hasNext: safePage < totalPages,
    }
}
  