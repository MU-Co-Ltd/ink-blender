import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import './globals.css'

import { routeTree } from './routeTree.gen'
import { useBlender } from './features/blend/hooks/use-blender'

const router = createRouter({ routeTree, context: { blender: undefined! } })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const blender = useBlender()

  return <RouterProvider router={router} context={{ blender }} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
