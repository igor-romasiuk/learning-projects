import type { BackgroundCard } from '@/types'
import { BackgroundStatus } from '@/types'

export const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
] as const

export const getRandomSampleImage = (): string => {
  return SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)]
}

export const INITIAL_BACKGROUNDS: BackgroundCard[] = [
  {
    id: '1',
    title: 'Office interior',
    prompt: 'Modern office interior with warm lighting',
    status: BackgroundStatus.SUCCESS,
    createdAt: new Date().toISOString(),
    imageUrl: SAMPLE_IMAGES[0],
    isDefault: true,
  },
  {
    id: '2',
    title: 'In progress',
    prompt: 'Vibrant abstract background',
    status: BackgroundStatus.SUCCESS,
    createdAt: new Date().toISOString(),
    imageUrl: SAMPLE_IMAGES[1],
  },
  {
    id: '3',
    title: 'Nature outdoor',
    prompt: 'Outdoor greenery background',
    status: BackgroundStatus.SUCCESS,
    createdAt: new Date().toISOString(),
    imageUrl: SAMPLE_IMAGES[2],
  },
  {
    id: '4',
    title: 'Failed sample',
    prompt: 'Glitchy neon background',
    status: BackgroundStatus.FAILED,
    createdAt: new Date().toISOString(),
    imageUrl: SAMPLE_IMAGES[5],
  },
  {
    id: '5',
    title: 'Tennis court',
    prompt: 'Outdoor tennis court scene',
    status: BackgroundStatus.SUCCESS,
    createdAt: new Date().toISOString(),
    imageUrl: SAMPLE_IMAGES[3],
  },
  {
    id: '6',
    title: 'Staircase setting',
    prompt: 'Indoor staircase with natural light',
    status: BackgroundStatus.SUCCESS,
    createdAt: new Date().toISOString(),
    imageUrl: SAMPLE_IMAGES[4],
  },
]
