import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/blend/result')({
  beforeLoad: import.meta.env.PROD
    ? async ({ context }) => {
        if (!context.blender.canBlend) {
          throw redirect({ to: '/blend' })
        }
      }
    : undefined,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="pt-16">
      <div className="container px-10 mx-auto">
        <Outlet />
      </div>
    </main>
  )
}
