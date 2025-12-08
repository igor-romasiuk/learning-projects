import { useEffect, useState } from "react"
import { paginate } from "../services/paginate"

export default function usePagination<T>(items: T[], pageSize = 5, initialPage = 1) {
    const [page, setPage] = useState(initialPage)
  
    useEffect(() => {
      setPage(1)
    }, [items])
  
    const result = paginate(items, page, pageSize)
  
    const goToNext = () => setPage(p => Math.min(p + 1, result.totalPages))
    const goToPrev = () => setPage(p => Math.max(p - 1, 1))
    const goToPage = (value: number) =>
      setPage(() => Math.max(1, Math.min(value, result.totalPages)))
  
    return { ...result, goToNext, goToPrev, goToPage }
}
  