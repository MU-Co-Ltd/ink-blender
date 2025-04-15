import { useBlender } from '@/features/blend/hooks/use-blender'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ErrorComponent } from './error'

export const Route = createFileRoute('/blend/result')({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
})

function RouteComponent() {
  const { canBlend } = useBlender()

  if (!canBlend) {
    throw new Error('Blend is not possible')
  }

  return (
    <main className="pt-16">
      <div className="container px-10 mx-auto">
        <Outlet />
      </div>
    </main>
  )
}
