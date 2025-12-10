export const UI = {
  CARD: {
    WIDTH: 112,
    HEIGHT: 198,
    BORDER_RADIUS: 16,
    BORDER_WIDTH: 2,
  },
  SPACING: {
    SECTION_GAP: 24,
    CARD_GAP: 12,
  },
  Z_INDEX: {
    BADGE: 20,
    CLONE_BUTTON: 20,
  },
} as const

export const STYLES = {
  BADGE_BASE: 'absolute left-2 top-2 z-20 rounded-md bg-white px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase shadow-sm',
  CARD_BASE: 'relative overflow-hidden cursor-pointer w-[112px] h-[198px] rounded-[16px]',
} as const
