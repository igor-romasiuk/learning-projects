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
  const baseButton =
    'inline-flex min-w-12 items-center justify-center rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-indigo-400 hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 disabled:cursor-not-allowed disabled:opacity-40';
  const activeButton = 'border-indigo-400/80 bg-indigo-500/20 text-white';

  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap items-center justify-center gap-3 rounded-[28px] border border-white/5 bg-slate-900/40 p-4 shadow-inner shadow-black/30">
      <button className={baseButton} disabled={isFirstPage} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </button>

      {paginationRange.map((paginationItem, index) => {
        if (paginationItem === 'dots') {
          return (
            <span key={`dots-${index}`} aria-hidden="true" className="px-2 text-lg text-slate-500">
              ...
            </span>
          )
        }

        const isActive = paginationItem === currentPage

        return (
          <button
            key={paginationItem}
            onClick={() => onPageChange(paginationItem)}
            aria-current={isActive ? 'page' : undefined}
            disabled={isActive}
            className={`${baseButton} ${isActive ? activeButton : ''}`}
          >
            {paginationItem}
          </button>
        )
      })}

      <button className={baseButton} disabled={isLastPage} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </nav>
  )
}

export default Pagination
