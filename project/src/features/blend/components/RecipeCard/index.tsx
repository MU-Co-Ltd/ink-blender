import { useStore } from '@nanostores/react'
import { $selectedInks } from '@/features/blend/stores/SelectedInks'
import BorderCard from '@/features/common/components/theme/BorderCard'
import { MAX_INK_COUNT } from '@/libs/constants'
import BlendPieChart from '@/features/blend/components/BlendPieChart'

export default function RecipeCard() {
  const blendedInks = useStore($selectedInks)

  return (
    <BorderCard className="rounded rounded-tl-none bg-white">
      <div className="flex">
        <p className="px-5 py-1.5 bg-theme-gray-primary text-theme-gray-tertiary rounded-br-2xl">
          配合の詳細
        </p>
      </div>
      <div className="pt-4 pb-6 px-5 flex gap-8">
        <ul className="grid grid-cols-2 gap-1.5 grow">
          {Array.from({ length: MAX_INK_COUNT }).map((_, index) => (
            <li
              key={index}
              className="flex items-center justify-center gap-2.5 p-2.5 min-h-20 border border-theme-gray-primary rounded empty:border-dashed"
            >
              {blendedInks[index] && (
                <>
                  <div className="basis-16">
                    <img
                      src={blendedInks[index].color.thumbnails.withSample}
                      alt={blendedInks[index].color.name}
                    />
                  </div>
                  <p className="text-xl">{blendedInks[index].amount}</p>
                </>
              )}
            </li>
          ))}
        </ul>
        {/** @memo blend result details */}
        <div className="w-25 shrink-0 space-y-2">
          <p className="text-theme-gray-tertiary text-center">ブレンド比率</p>
          <BlendPieChart className="w-full" />
        </div>
        {/** @memo blend graph */}
      </div>
    </BorderCard>
  )
}
