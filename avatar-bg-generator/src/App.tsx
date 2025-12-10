import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { BackgroundSidebar } from '@/components/background'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black flex items-center justify-center font-italian">
      <Button
        onClick={() => setOpen(true)}
        className="rounded-full px-6 py-3 text-sm font-medium"
      >
        Change background
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[420px] sm:w-[480px] border-l border-slate-200 bg-white !p-0 !gap-0 flex flex-col h-full overflow-hidden font-italian"
        >
          <div className="px-6 pt-6 pb-3 flex-shrink-0">
            <SheetHeader className="flex flex-row items-center justify-between space-y-0">
              <SheetTitle className="text-[22px] leading-tight font-semibold tracking-tight">
                Change background
              </SheetTitle>
              <SheetDescription className="sr-only">
                Generate, manage, and select background images for your avatar
              </SheetDescription>
            </SheetHeader>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            <div className="px-6 pb-6">
              <BackgroundSidebar />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
