import React from 'react'
import styles from './Pagination.module.css'

type PageItem = number | '...'

type Props = {
  page: number
  totalPages: number
  hasPrev: boolean
  hasNext: boolean
  goToPrev: () => void
  goToNext: () => void
  goToPage: (page: number) => void
}


const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

const Pagination: React.FC<Props> = ({
    page,
    totalPages,
    hasPrev,
    hasNext,
    goToPrev,
    goToNext,
    goToPage,
}) => {
    const pages: PageItem[] =
      totalPages <= 5
        ? Array.from({ length: totalPages }, (_, i) => i + 1)
        : [1, 2, 3, '...', totalPages]
  
    return (
      <div className={styles.pagination}>
        <button className={styles.button} disabled={!hasPrev} onClick={goToPrev}>
          Prev
        </button>
  
        {pages.map((item, index) =>
          item === '...' ? (
            <span key={`dots-${index}`} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => goToPage(item)}
              disabled={item === page}
              className={cx(styles.button, styles.pageButton, item === page && styles.activePage)}
            >
              {item}
            </button>
          )
        )}

        <button className={styles.button} disabled={!hasNext} onClick={goToNext}>
          Next
        </button>
      </div>
    )
}

export default Pagination
