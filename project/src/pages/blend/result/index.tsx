import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@nanostores/react'
import { $selectedInks } from '@/features/blend/stores/SelectedInks'

export const Route = createFileRoute('/blend/result/')({
  component: RouteComponent,
})

function RouteComponent() {
  const selectedInks = useStore($selectedInks)

  return (
    <div>
      <h1>Blend Result</h1>
      <div>
        {selectedInks.map((ink) => (
          <div key={ink.color.name}>
            <h2 style={{ color: ink.color.hex }}>{ink.color.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
