import BlendPieChart from '@/features/blend/components/BlendPieChart'
import InkSelectSlider from '@/features/blend/components/InkSelectSlider'
import ExecuteBlendButton from '@/features/blend/components/ExecuteBlendButton'
import SelectedInkList from '@/features/blend/components/SelectedInkList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blend/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="grid grid-rows-[1fr_auto]">
      <div className="self-center overflow-x-hidden">
        <InkSelectSlider />
      </div>
      <div className="bg-white shadow-[0_-3px_5px_0_theme('colors.gray.200')]">
        <div className="p-8 grid grid-cols-[1fr_auto] gap-x-6 gap-y-4 max-w-7xl mx-auto">
          <div className="row-span-2">
            <SelectedInkList />
          </div>
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
            <ExecuteBlendButton />
          </div>
        </div>
      </div>
    </main>
  )
}
