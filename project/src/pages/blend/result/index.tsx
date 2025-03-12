import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blend/result/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/blend/result/"!</div>
}
