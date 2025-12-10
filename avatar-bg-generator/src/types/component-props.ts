import type { BackgroundCard } from './background'

export interface BackgroundCardItemProps {
  card: BackgroundCard
  isDefault?: boolean
  isSelected?: boolean
}

export interface CircularProgressProps {
  progress: number
  timeRemaining: number
}

export interface StatusBadgeProps {
  variant: 'default' | 'failed'
  children: React.ReactNode
}
