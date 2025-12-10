import type { BackgroundCard } from '@/types'
import { BackgroundStatus } from '@/types'
import { useBackgroundStore } from '@/store'
import { CircularProgress, StatusBadge } from '@/components/shared'
import { STYLES, TIMING, STATUS_LABELS } from '@/constants'
import clsx from 'clsx'
import { Copy } from 'lucide-react'

interface BackgroundCardItemProps {
  card: BackgroundCard
  isDefault?: boolean
  isSelected?: boolean
}

export function BackgroundCardItem({ card, isDefault, isSelected }: BackgroundCardItemProps) {
  const { selectCard, cloneCard, setDefaultCard } = useBackgroundStore()

  const handleSelect = () => selectCard(card.id)
  const handleDoubleClick = () => setDefaultCard(card.id)
  const handleClone = (e: React.MouseEvent) => {
    e.stopPropagation()
    cloneCard(card.id)
  }

  const showProgress = card.status === BackgroundStatus.GENERATING

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onDoubleClick={handleDoubleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleSelect()
        }
      }}
      className={clsx(
        STYLES.CARD_BASE,
        isSelected
          ? 'border-2 border-black'
          : 'border-2 border-transparent hover:shadow-md'
      )}
    >
      {isDefault && !showProgress && (
        <StatusBadge variant="default">{STATUS_LABELS.DEFAULT}</StatusBadge>
      )}

      {!showProgress && (
        <button
          type="button"
          onClick={handleClone}
          className="absolute right-1.5 top-1.5 z-20 rounded-full bg-white/90 w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 transition-colors shadow-sm"
          aria-label="Clone background"
        >
          <Copy className="w-3 h-3" />
        </button>
      )}

      {card.imageUrl ? (
        <img
          src={card.imageUrl}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300" />
      )}

      {showProgress && (
        <CircularProgress
          progress={card.progress ?? 0}
          timeRemaining={card.timeRemaining ?? TIMING.PROGRESS.INITIAL_TIME}
        />
      )}

      {!showProgress && card.status === BackgroundStatus.FAILED && (
        <StatusBadge variant="failed">{STATUS_LABELS.FAILED}</StatusBadge>
      )}
    </div>
  )
}
