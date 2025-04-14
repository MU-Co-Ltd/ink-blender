import { Button } from '@/features/common/components/ui/button'
import type { TInk } from '@/types'
import { useBlender } from '@/features/blend/hooks/use-blender'
import { MAX_INK_COUNT } from '@/libs/constants'
import { useStore } from '@nanostores/react'
import { $selectedInks } from '@/features/blend/stores/SelectedInks'

export default function SelectedInkList() {
  const selectedInks = useStore($selectedInks)

  return (
    <ul className="grid grid-cols-4 gap-3">
      {Array.from({ length: MAX_INK_COUNT }).map((_, index) => (
        <li key={index}>
          <SelectedInkCard order={index + 1} ink={selectedInks[index]} />
        </li>
      ))}
    </ul>
  )
}

interface ComponentProps {
  ink?: TInk
  order: number
}

function SelectedInkCard({ ink, order }: ComponentProps) {
  const { decreaseInkAmount, increaseInkAmount, removeInk } = useBlender()

  return (
    <div className="border empty:border-dashed min-h-[15.5rem] border-theme-gray-primary rounded-tr-2xl h-full grid grid-rows-[auto_1fr_auto] gap-3">
      {ink && (
        <>
          <div className="flex justify-between items-start">
            <p className="px-5 py-1.5 bg-theme-gray-primary text-theme-gray-tertiary text-xs rounded-br-2xl">
              <span className="text-base leading-none">{order}</span>色目
            </p>
            <Button
              variant="ghost"
              className="text-theme-gray-primary bg-transparent"
              onClick={() => removeInk(ink.color)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <div className="px-4">
            <picture>
              <img
                src={ink.color.thumbnails.withSample}
                alt={ink.color.name}
                width="120"
                height="103"
                className="w-full h-full object-scale-down"
              />
            </picture>
          </div>
          <div className="flex items-center justify-center gap-2.5 pb-3.5 px-4">
            <Button
              className="size-10 p-0 flex items-center justify-center rounded-full bg-white border border-theme-gray-primary text-theme-gray-tertiary shrink-0"
              onClick={() => decreaseInkAmount(ink.color)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </Button>
            <div className="text-xl px-4 text-center border-b border-theme-gray-primary basis-12">
              {ink.amount}
            </div>
            <Button
              className="size-10 p-0 flex items-center justify-center rounded-full bg-white border border-theme-gray-primary text-theme-gray-tertiary shrink-0"
              onClick={() => increaseInkAmount(ink.color)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
