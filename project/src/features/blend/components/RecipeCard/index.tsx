import { useStore } from '@nanostores/react'
import { $selectedInks } from '@/features/blend/stores/SelectedInks'
import BorderCard from '@/features/common/components/theme/BorderCard'

export default function RecipeCard() {
  const blendedInks = useStore($selectedInks)

  return (
    <BorderCard className="rounded rounded-tl-none bg-white">
      <div className="flex">
        <p className="px-5 py-1.5 bg-theme-gray-primary text-theme-gray-tertiary rounded-br-2xl">
          配合の詳細
        </p>
      </div>
      <div className="flex justify-center gap-5 mt-6 px-5 pb-10">
        {blendedInks.map(({ color, amount }) => (
          <div key={color.name} className="space-y-2 basis-1/5">
            <div>
              <picture>
                <img
                  src={color.thumbnails.withSample}
                  alt={color.name}
                  width="120"
                  height="103"
                  className="w-full"
                />
              </picture>
            </div>
            <p className="text-xl text-center">{amount}</p>
          </div>
        ))}
      </div>
    </BorderCard>
  )
}
