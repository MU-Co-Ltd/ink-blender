import InkSelectSlider from '@/features/blend/components/InkSelectSlider'
import SelectedInkCard from '@/features/blend/components/SelectedInkCard'
import { useSelectedInks } from '@/features/blend/providers/SelectedInks'
import { MAX_INK_COUNT } from '@/libs/constants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blend/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { selectedInks } = useSelectedInks()

  return (
    <main className="grid grid-rows-[1fr_auto]">
      <div className="self-center overflow-x-hidden">
        <InkSelectSlider />
      </div>
      <div className="bg-white p-8 shadow-[0_-3px_5px_0_theme('colors.gray.200')] grid grid-cols-[1fr_auto] gap-x-8 gap-y-3">
        <ul className="grid grid-cols-4 gap-3 row-span-2">
          {Array.from({ length: MAX_INK_COUNT }).map((_, index) => (
            <li key={index}>
              <SelectedInkCard order={index + 1} ink={selectedInks[index]} />
            </li>
          ))}
        </ul>
        {/* @memo Selected color inks */}
        <div className="p-5 border border-theme-gray-primary rounded-2xl">
          <div className="space-y-3">
            <p>現在のブレンド比率</p>
            <p className="text-sm">選んだ各インクの配分を4滴指定出来ます。</p>
            <p className="text-xs space-y-2">
              <span className="block">
                ※2色以上選択しないとブレンド開始されません。
              </span>
              <span className="block">
                ※配分は「4滴」にしてください。
                <br />
                それ以上でも以下でもブレンド開始されません。
              </span>
            </p>
          </div>
          <div></div>
          {/* @memo Color graph */}
        </div>
        <div>
          <button
            type="button"
            className="block w-full py-2.5 text-theme-gray-primary bg-theme-gray-secondary rounded"
          >
            ブレンド開始
          </button>
        </div>
      </div>
    </main>
  )
}
