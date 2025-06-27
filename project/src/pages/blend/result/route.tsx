import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/blend/result')({
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
