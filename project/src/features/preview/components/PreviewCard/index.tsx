import AppLogo from '@/features/common/components/theme/AppLogo'
import type { ReactNode } from '@tanstack/react-router'

interface ComponentProps {
  children?: ReactNode
}

export default function PreviewCard({ children }: ComponentProps) {
  return (
    <div className="relative z-1 shadow-lg border border-theme-beige-primary">
      <div className="absolute -z-1 inset-0">
        <img
          src="/paper-bg.jpg"
          alt="標本背景"
          width={800}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <article className="py-4 px-6 space-y-4 bg-slate-50/50">
        <header>
          <p className="text-sm text-theme-beige-primary">
            <time dateTime={new Date().toISOString()}>
              {new Date()
                .toLocaleString('ja-JP', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
                .replace(/\//g, '.')}
            </time>
          </p>
        </header>
        <main>{children}</main>
        <footer>
          <div className="text-theme-beige-secondary flex justify-end">
            <AppLogo />
          </div>
        </footer>
      </article>
    </div>
  )
}
