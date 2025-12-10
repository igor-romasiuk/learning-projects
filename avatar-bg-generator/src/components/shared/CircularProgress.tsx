import type { CircularProgressProps } from '@/types'

export function CircularProgress({ progress, timeRemaining }: CircularProgressProps) {
  const size = 64
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  const formatTime = (seconds: number): string => {
    if (seconds <= 0) return 'Almost done'
    if (seconds < 60) return `${seconds} sec left`
    const minutes = Math.ceil(seconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} left`
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
          {progress}%
        </span>
      </div>
      <span className="mt-2 text-[11px] text-white/80">
        {formatTime(timeRemaining)}
      </span>
    </div>
  )
}
