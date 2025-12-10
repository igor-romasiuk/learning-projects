import type { BackgroundCard } from '@/types'
import { BackgroundStatus } from '@/types'
import { TIMING } from '@/constants'

type UpdateFunction = (card: BackgroundCard) => BackgroundCard
type ProgressCallback = (updateFn: UpdateFunction) => void

export function simulateProgress(
  cardId: string,
  onUpdate: ProgressCallback
): void {
  const progressInterval = setInterval(() => {
    let shouldClear = false
    
    const updateFn: UpdateFunction = (card: BackgroundCard) => {
      if (!card || card.status !== BackgroundStatus.GENERATING || card.id !== cardId) {
        shouldClear = true
        return card
      }

      const newProgress = Math.min(
        (card.progress || 0) + TIMING.PROGRESS.INCREMENT,
        100
      )
      const newTimeRemaining = Math.max(
        (card.timeRemaining || TIMING.PROGRESS.INITIAL_TIME) - TIMING.PROGRESS.TIME_DECREMENT,
        0
      )

      if (newProgress >= 100) {
        shouldClear = true
        return {
          ...card,
          status: BackgroundStatus.SUCCESS,
          progress: 100,
          timeRemaining: 0,
        }
      }

      return {
        ...card,
        progress: newProgress,
        timeRemaining: newTimeRemaining,
      }
    }

    onUpdate(updateFn)

    if (shouldClear) {
      clearInterval(progressInterval)
    }
  }, TIMING.PROGRESS.UPDATE_INTERVAL)
}
