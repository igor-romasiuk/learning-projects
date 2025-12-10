import { useBackgroundStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { BackgroundCardItem } from './BackgroundCardItem'
import { Undo2, Redo2 } from 'lucide-react'
import { AiSparkleGradient, AiSparkleSolid } from '@/components/icons/AiSparkle'

export function BackgroundSidebar() {
  const {
    cards,
    selectedCardId,
    prompt,
    setPrompt,
    generateBackground,
  } = useBackgroundStore()

  return (
    <div className="flex flex-col gap-6">
      <section className="space-y-3">
        <p className="text-sm font-medium text-slate-900 tracking-tight">
          Background idea
        </p>

        <div className="rounded-[12px] border border-slate-200 bg-white shadow-sm px-4 pt-4 pb-3 h-[195px] flex flex-col">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Animate glowing rays pulsating from behind the bottle..."
            className="border-none shadow-none resize-none p-0 flex-1 text-sm text-slate-900 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <div className="flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={generateBackground}
              disabled={!prompt.trim()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-900 hover:text-black disabled:opacity-40"
            >
              <AiSparkleGradient className="w-[18px] h-[18px]" />
              <span>Regenerate</span>
            </button>

            <div className="flex items-center gap-4 text-slate-300">
              <button type="button" className="hover:text-slate-500 transition" aria-label="Undo">
                <Undo2 className="w-4 h-4" />
              </button>
              <button type="button" className="hover:text-slate-500 transition" aria-label="Redo">
                <Redo2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Button
          className="w-full rounded-[28px] bg-black hover:bg-black/90 text-white text-sm font-medium h-12 inline-flex items-center justify-center gap-2 disabled:opacity-40"
          onClick={generateBackground}
          disabled={!prompt.trim()}
        >
          <AiSparkleSolid className="w-4 h-4" />
          <span>Generate BG for 1 credit</span>
        </Button>
      </section>

      <section className="mt-4">
        <p className="mb-3 text-sm font-medium text-slate-900 tracking-tight">
          Your backgrounds
        </p>

        <div className="grid grid-cols-3 gap-3">
          {cards.map((card) => (
            <BackgroundCardItem
              key={card.id}
              card={card}
              isDefault={card.isDefault}
              isSelected={card.id === selectedCardId}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
