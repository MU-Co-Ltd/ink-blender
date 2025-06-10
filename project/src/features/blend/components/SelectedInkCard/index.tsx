import { Button } from '@/features/common/components/ui/button'
import type { TInk } from '@/types'
import { useBlender } from '@/features/blend/hooks/use-blender'
import BorderCard from '@/features/common/components/theme/BorderCard'

interface ComponentProps {
  ink?: TInk
  order: number
}

export default function SelectedInkCard({ ink, order }: ComponentProps) {
  const { decreaseInkAmount, increaseInkAmount, removeInk } = useBlender()

  return (
    <BorderCard className="empty:border-dashed min-h-[15.5rem] rounded-tr-2xl h-full grid grid-rows-[auto_1fr_auto] gap-3">
      {ink && (
        <>
          <div className="flex justify-between items-start">
            <p className="px-5 py-1.5 bg-theme-gray-primary text-theme-gray-tertiary text-xs rounded-br-2xl">
              <span className="text-base leading-none">{order}</span>色目
            </p>
            <button
              className="flex items-center justify-center size-8 rounded-full p-0 text-theme-gray-primary hover:text-theme-gray-tertiary bg-transparent cursor-pointer"
              onClick={() => removeInk(ink.color)}
              title="選択した色を削除"
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
            </button>
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
              className="size-10 p-0 flex items-center justify-center rounded-full bg-white border border-theme-gray-primary text-theme-gray-tertiary shrink-0 cursor-pointer hover:opacity-50 hover:bg-transparent"
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
              className="size-10 p-0 flex items-center justify-center rounded-full bg-white border border-theme-gray-primary text-theme-gray-tertiary shrink-0 cursor-pointer hover:opacity-50 hover:bg-transparent"
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
    </BorderCard>
  )
}
