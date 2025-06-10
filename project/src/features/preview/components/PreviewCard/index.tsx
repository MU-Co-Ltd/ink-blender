import AppLogo from '@/features/common/components/theme/AppLogo'
import type { ReactNode } from '@tanstack/react-router'
import { forwardRef, useEffect, useRef, useCallback } from 'react'

interface ComponentProps {
  children?: ReactNode
  enable3D?: boolean
}

const PreviewCard = forwardRef<HTMLDivElement, ComponentProps>(
  ({ children, enable3D = false }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const cardRef = ref || internalRef

    // パフォーマンス最適化：throttleを使用してイベントの頻度を制限
    const throttleRef = useRef<number | null>(null)

    const handlePointerMove = useCallback(
      (event: PointerEvent) => {
        if (
          !enable3D ||
          !cardRef ||
          !('current' in cardRef) ||
          !cardRef.current
        ) {
          return
        }

        // throttleでパフォーマンス改善
        if (throttleRef.current) {
          return
        }

        throttleRef.current = requestAnimationFrame(() => {
          const element = cardRef.current!
          const rect = element.getBoundingClientRect()

          const absolutePosition = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          }

          const percentPosition = {
            x: Math.round((100 / rect.width) * absolutePosition.x),
            y: Math.round((100 / rect.height) * absolutePosition.y),
          }

          const centerPosition = {
            x: percentPosition.x - 50,
            y: percentPosition.y - 50,
          }

          // 傾き・スケール調整
          const rotateX = -(centerPosition.y / 6)
          const rotateY = centerPosition.x / 7
          const scale = 1.01

          // CSS Propertiesを直接設定
          element.style.setProperty('--card-rotate-x', `${rotateX}deg`)
          element.style.setProperty('--card-rotate-y', `${rotateY}deg`)
          element.style.setProperty('--card-scale', `${scale}`)
          element.style.setProperty('--card-transition', 'none')

          throttleRef.current = null
        })
      },
      [enable3D, cardRef]
    )

    const handlePointerLeave = useCallback(() => {
      if (!enable3D || !cardRef || !('current' in cardRef) || !cardRef.current)
        return

      const element = cardRef.current

      // スムーズなトランジションでリセット
      element.style.setProperty('--card-transition', 'transform 0.5s ease-out')

      setTimeout(() => {
        element.style.setProperty('--card-rotate-x', '0deg')
        element.style.setProperty('--card-rotate-y', '0deg')
        element.style.setProperty('--card-scale', '1')
      }, 50)
    }, [enable3D, cardRef])

    useEffect(() => {
      if (
        !enable3D ||
        !cardRef ||
        !('current' in cardRef) ||
        !cardRef.current
      ) {
        return
      }

      const element = cardRef.current

      element.addEventListener('pointermove', handlePointerMove)
      element.addEventListener('pointerleave', handlePointerLeave)

      return () => {
        element.removeEventListener('pointermove', handlePointerMove)
        element.removeEventListener('pointerleave', handlePointerLeave)
        if (throttleRef.current) {
          cancelAnimationFrame(throttleRef.current)
        }
      }
    }, [enable3D, handlePointerMove, handlePointerLeave])

    const cardStyle = enable3D
      ? ({
          transform:
            'perspective(600px) rotateX(var(--card-rotate-x, 0deg)) rotateY(var(--card-rotate-y, 0deg)) scale(var(--card-scale, 1))',
          transition: 'var(--card-transition, transform 0.5s ease-out)',
          transformStyle: 'preserve-3d' as const,
          '--card-rotate-x': '0deg',
          '--card-rotate-y': '0deg',
          '--card-scale': '1',
          '--card-transition': 'transform 0.5s ease-out',
        } as React.CSSProperties)
      : {}

    return (
      <div
        className="relative z-1 shadow-lg border border-theme-beige-primary [&_*]:pointer-events-none"
        ref={cardRef}
        style={cardStyle}
      >
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
)

PreviewCard.displayName = 'PreviewCard'

export default PreviewCard
