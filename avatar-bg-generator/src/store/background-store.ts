import { create } from 'zustand'
import type { BackgroundCard } from '@/types'
import { BackgroundStatus } from '@/types'
import { TIMING } from '@/constants'
import { INITIAL_BACKGROUNDS, getRandomSampleImage } from '@/data'
import { simulateProgress } from '@/lib'
import { isValidPrompt } from '@/lib'

interface BackgroundState {
  cards: BackgroundCard[]
  selectedCardId: string | null
  prompt: string
  setPrompt: (value: string) => void
  selectCard: (id: string) => void
  setDefaultCard: (id: string) => void
  generateBackground: () => void
  cloneCard: (id: string) => void
}

export const useBackgroundStore = create<BackgroundState>((set, get) => ({
  cards: INITIAL_BACKGROUNDS,
  selectedCardId: '1',
  prompt: '',

  setPrompt: (value) => set({ prompt: value }),

  selectCard: (id) => set({ selectedCardId: id }),

  setDefaultCard: (id) =>
    set((state) => ({
      cards: state.cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      })),
    })),

  generateBackground: () => {
    const { prompt, cards } = get()
    
    if (!isValidPrompt(prompt)) return

    const newCard: BackgroundCard = {
      id: crypto.randomUUID(),
      title: `Variant ${cards.length + 1}`,
      prompt,
      status: BackgroundStatus.GENERATING,
      createdAt: new Date().toISOString(),
      progress: 0,
      timeRemaining: TIMING.PROGRESS.INITIAL_TIME,
      imageUrl: getRandomSampleImage(),
    }

    set({ cards: [newCard, ...cards], selectedCardId: newCard.id })

    simulateProgress(newCard.id, (updateFn) => {
      set((state) => ({
        cards: state.cards.map((c) => (c.id === newCard.id ? updateFn(c) : c)),
      }))
    })
  },

  cloneCard: (id) => {
    const { cards } = get()
    const original = cards.find((c) => c.id === id)
    
    if (!original) return

    const cloned: BackgroundCard = {
      ...original,
      id: crypto.randomUUID(),
      title: `${original.title} copy`,
      createdAt: new Date().toISOString(),
      isDefault: false,
    }

    set({ cards: [cloned, ...cards] })
  },
}))
