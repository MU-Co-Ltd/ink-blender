import BlendPieChart from '@/features/blend/components/BlendPieChart'
import InkSelectSlider from '@/features/blend/components/InkSelectSlider'
import RunBlendButton from '@/features/blend/components/RunBlendButton'
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
      <div className="bg-white shadow-[0_-3px_5px_0_theme('colors.gray.200')]">
        <div className="p-8 grid grid-cols-[1fr_auto] gap-x-6 gap-y-4 max-w-7xl mx-auto">
          <ul className="grid grid-cols-4 gap-3 row-span-2">
            {Array.from({ length: MAX_INK_COUNT }).map((_, index) => (
              <li key={index}>
                <SelectedInkCard order={index + 1} ink={selectedInks[index]} />
              </li>
            ))}
          </ul>
          <div className="p-5 border border-theme-gray-primary rounded-2xl flex items-center gap-3">
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
            <div>
              <BlendPieChart />
            </div>
          </div>
          <div>
            <RunBlendButton />
          </div>
        </div>
      </div>
    </main>
  )
}
