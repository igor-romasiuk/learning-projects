export const BackgroundStatus = {
  IDLE: 'idle',
  GENERATING: 'generating',
  SUCCESS: 'success',
  FAILED: 'failed',
} as const

export type BackgroundStatus = typeof BackgroundStatus[keyof typeof BackgroundStatus]

export interface BackgroundCard {
  id: string
  title: string
  prompt: string
  status: BackgroundStatus
  createdAt: string
  progress?: number
  timeRemaining?: number
  imageUrl?: string
  isDefault?: boolean
}
