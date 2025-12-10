import type { StatusBadgeProps } from '@/types'
import { STYLES } from '@/constants'
import clsx from 'clsx'

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  return (
    <span className={clsx(
      STYLES.BADGE_BASE,
      variant === 'failed' ? 'text-red-600' : 'text-slate-900'
    )}>
      {children}
    </span>
  )
}
