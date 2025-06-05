import { Toaster } from '@/features/common/components/ui/sonner'
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
      <Outlet />
      <Toaster position="bottom-right" richColors />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  )
}
