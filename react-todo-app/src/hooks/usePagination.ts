import { useMemo, useState } from "react"

type PaginationItem = number | 'dots'

interface UsePaginationOptions {
  pageSize: number
  initialPage?: number
  siblingCount?: number
}

const DEFAULT_SIBLING_COUNT = 1

export function usePagination({
  pageSize,
  initialPage = 1,
  siblingCount = DEFAULT_SIBLING_COUNT
}: UsePaginationOptions) {
  const [page, setPage] = useState(initialPage)
  const [totalItems, setTotalItems] = useState(0)

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  const paginationRange = useMemo<PaginationItem[]>(() => {
    const totalPageNumbers = siblingCount * 2 + 5

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1)
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages)
    const showLeftDots = leftSiblingIndex > 2
    const showRightDots = rightSiblingIndex < totalPages - 1

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      return [
        ...Array.from({ length: leftItemCount }, (_, index) => index + 1),
        'dots',
        totalPages
      ]
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      return [
        1,
        'dots',
        ...Array.from(
          { length: rightItemCount },
          (_, index) => totalPages - rightItemCount + 1 + index
        )
      ]
    }

    return [
      1,
      'dots',
      ...Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, index) => leftSiblingIndex + index
      ),
      'dots',
      totalPages
    ]
  }, [page, siblingCount, totalPages])

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return

    setPage(nextPage)
  }

  const updateTotalItems = (count: number) => {
    setTotalItems(count)

    setPage(prevPage => {
      if (count === 0) return 1

      const nextTotalPages = Math.max(1, Math.ceil(count / pageSize))
      return Math.min(prevPage, nextTotalPages)
    })
  }

  return {
    page,
    totalPages,
    paginationRange,
    handlePageChange,
    setTotalItems: updateTotalItems,
    isFirstPage: page === 1,
    isLastPage: page === totalPages
  }
}

export type { PaginationItem }
