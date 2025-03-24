import { SelectedInksProvider } from '@/features/blend/providers/SelectedInks'
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [{ title: '手が汚れない！インクブレンダー' }],
  }),
})

function RootComponent() {
  return (
    <>
      <HeadContent />
      <SelectedInksProvider>
        <Outlet />
      </SelectedInksProvider>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  )
}
