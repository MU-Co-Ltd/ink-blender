import { useBlender } from '@/features/blend/hooks/use-blender'
import { Toaster } from '@/features/common/components/ui/sonner'
import {
  PROJECT_NAME,
  PROJECT_DESCRIPTION,
  PROJECT_BASE_URL,
} from '@/libs/constants'
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

interface RouterContext {
  blender: ReturnType<typeof useBlender>
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      { title: PROJECT_NAME },
      {
        name: 'description',
        content: PROJECT_DESCRIPTION.replace('/\n/g', ''),
      },
      {
        name: 'Target Geographic Area',
        content: 'Japan',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: PROJECT_NAME,
      },
      {
        property: 'og:description',
        content: PROJECT_DESCRIPTION.replace('/\n/g', ''),
      },
      {
        property: 'og:url',
        content: PROJECT_BASE_URL,
      },
      {
        property: 'og:site_name',
        content: PROJECT_NAME,
      },
      {
        property: 'og:image',
        content: `${PROJECT_BASE_URL}/ogp.jpg`,
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
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
