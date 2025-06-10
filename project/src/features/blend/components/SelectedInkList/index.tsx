import { MAX_INK_COUNT } from '@/libs/constants'
import { useStore } from '@nanostores/react'
import { $selectedInks } from '@/features/blend/stores/SelectedInks'
import SelectedInkCard from '@/features/blend/components/SelectedInkCard'

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
