import AppLogo from '@/features/common/components/theme/AppLogo'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/blend')({
  component: RouteLayoutComponent,
})

function RouteLayoutComponent() {
  return (
    <div className="size-full grid grid-rows-[auto_1fr]">
      <header>
        <div className="py-4 px-8 flex justify-between items-center">
          <Link to="/" className="inline-block">
            <AppLogo />
          </Link>
          {import.meta.env.DEV && (
            <ul className="flex gap-4">
              <li>
                <Link to="/blend">ブレンド</Link>
              </li>
              <li>
                <Link to="/blend/result">結果</Link>
              </li>
              <li>
                <Link to="/blend/result/preview">プレビュー</Link>
              </li>
            </ul>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  )
}
