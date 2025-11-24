import type { PaginationItem } from "../hooks/usePagination"

interface PaginationProps {
  currentPage: number
  paginationRange: PaginationItem[]
  onPageChange: (page: number) => void
  isFirstPage: boolean
  isLastPage: boolean
  ariaLabel?: string
}

const defaultAriaLabel = 'Todo pagination'

const Pagination = ({
  currentPage,
  paginationRange,
  onPageChange,
  isFirstPage,
  isLastPage,
  ariaLabel = defaultAriaLabel
}: PaginationProps) => {
  return (
    <nav aria-label={ariaLabel}>
      <button disabled={isFirstPage} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </button>

      {paginationRange.map((paginationItem, index) => {
        if (paginationItem === 'dots') {
          return (
            <span key={`dots-${index}`} aria-hidden="true">
              ...
            </span>
          )
        }

        return (
          <button
            key={paginationItem}
            onClick={() => onPageChange(paginationItem)}
            aria-current={currentPage === paginationItem ? 'page' : undefined}
            disabled={paginationItem === currentPage}
          >
            {paginationItem}
          </button>
        )
      })}

      <button disabled={isLastPage} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </nav>
  )
}

export default Pagination
