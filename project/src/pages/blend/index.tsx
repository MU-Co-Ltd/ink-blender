import InkSelectSlider from '@/features/blend/components/InkSelectSlider'
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
      <div className="bg-white p-8 shadow-[0_-3px_5px_0_theme('colors.gray.200')]">
        <div></div>
        {/* @memo Selected color inks */}
        <div>
          <div className="p-5 border border-theme-gray-primary rounded-2xl">
            <div className="space-y-4">
              <p>現在のブレンド比率</p>
              <p className="text-sm">選んだ各インクの配分を4滴指定出来ます。</p>
              <p className="text-xs space-y-2.5">
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
          <div></div>
          {/* @memo Button */}
        </div>
      </div>
    </main>
  )
}
