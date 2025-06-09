import { useEffect, useState } from 'react'
import { useBlender } from '@/features/blend/hooks/use-blender'
import { useStore } from '@nanostores/react'
import { $selectedInks } from '@/features/blend/stores/SelectedInks'

interface InkDropAnimationProps {
  isVisible: boolean
  onComplete: () => void
  duration?: number
}

export default function InkDropAnimation({
  isVisible,
  onComplete,
  duration = 4000,
}: InkDropAnimationProps) {
  const { getBlendedInkHex } = useBlender()
  const selectedInks = useStore($selectedInks)
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<
    'preparing' | 'dropping' | 'swirling' | 'mixing' | 'complete'
  >('preparing')
  const [droppedInks, setDroppedInks] = useState<
    Array<{ color: string; x: number; y: number; delay: number }>
  >([])

  const finalColor = getBlendedInkHex()

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      setCurrentPhase('preparing')
      setDroppedInks([])
      return
    }

    // インク滴の初期位置を計算
    const drops: Array<{ color: string; x: number; y: number; delay: number }> =
      []
    selectedInks.forEach((ink, inkIndex) => {
      for (let i = 0; i < ink.amount; i++) {
        const angle = (360 / selectedInks.length) * inkIndex + i * 20
        const radius = 80
        const x = 50 + Math.cos((angle * Math.PI) / 180) * radius
        const y = 50 + Math.sin((angle * Math.PI) / 180) * radius
        drops.push({
          color: ink.color.hex,
          x,
          y,
          delay: inkIndex * 300 + i * 150,
        })
      }
    })
    setDroppedInks(drops)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 50)

        // フェーズの更新
        if (newProgress < 15) {
          setCurrentPhase('preparing')
        } else if (newProgress < 40) {
          setCurrentPhase('dropping')
        } else if (newProgress < 70) {
          setCurrentPhase('swirling')
        } else if (newProgress < 95) {
          setCurrentPhase('mixing')
        } else {
          setCurrentPhase('complete')
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 800)
          return 100
        }

        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isVisible, duration, onComplete, selectedInks])

  if (!isVisible) return null

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'preparing':
        return 'インクボトルを準備しています...'
      case 'dropping':
        return 'インクを一滴ずつ注いでいます...'
      case 'swirling':
        return 'インクが混ざり始めています...'
      case 'mixing':
        return '美しい色が生まれています...'
      case 'complete':
        return 'ブレンド完了！'
      default:
        return 'ブレンド中...'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full mx-4 space-y-6">
        {/* ヘッダー */}
        <p className="text-gray-600 text-lg text-center">{getPhaseText()}</p>

        {/* メインアニメーションコンテナ */}
        <div className="relative z-1">
          {/* メインアニメーション容器 */}
          <div className="relative w-80 h-80 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-full border-8 border-gray-200 shadow-inner overflow-hidden">
            {/* 水面の表現 */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 opacity-30" />

            {/* 最終色の背景 */}
            {currentPhase !== 'preparing' && (
              <div
                className="absolute inset-8 rounded-full transition-all duration-2000 ease-out"
                style={{
                  backgroundColor: finalColor,
                  opacity:
                    currentPhase === 'complete'
                      ? 0.6
                      : Math.max(0.1, ((progress - 30) / 70) * 0.4),
                  transform: `scale(${currentPhase === 'complete' ? 1 : Math.max(0.3, (progress - 30) / 70)})`,
                }}
              />
            )}

            {/* インク滴のアニメーション */}
            {droppedInks.map((drop, index) => {
              const dropProgress = Math.max(
                0,
                progress - (drop.delay / duration) * 100
              )
              const isDropVisible = dropProgress > 0
              const isDropping = dropProgress < 30
              const isSwirling = dropProgress >= 30 && dropProgress < 60
              const isMixing = dropProgress >= 60

              return (
                <div
                  key={`drop-${index}`}
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    width: isDropping ? '8px' : isSwirling ? '12px' : '16px',
                    height: isDropping ? '12px' : isSwirling ? '12px' : '16px',
                    backgroundColor: isMixing ? finalColor : drop.color,
                    borderRadius: isDropping ? '50% 50% 50% 0' : '50%',
                    top: isDropping ? '20%' : '50%',
                    left: isDropping ? `${drop.x}%` : '50%',
                    transform: `
                    translate(-50%, -50%)
                    ${
                      isSwirling
                        ? `
                      rotate(${dropProgress * 6}deg)
                      translateX(${30 - dropProgress * 0.5}px)
                    `
                        : ''
                    }
                    ${isMixing ? `scale(${1 - dropProgress * 0.01})` : ''}
                  `,
                    opacity: isDropVisible
                      ? isMixing && dropProgress > 80
                        ? 0
                        : 1
                      : 0,
                    transitionDelay: `${drop.delay}ms`,
                    zIndex: isDropping ? 10 : 5,
                    boxShadow: isDropping
                      ? `0 2px 4px ${drop.color}40`
                      : 'none',
                  }}
                />
              )
            })}

            {/* 混合の渦巻きエフェクト */}
            {(currentPhase === 'swirling' || currentPhase === 'mixing') && (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`swirl-${index}`}
                    className="absolute top-1/2 left-1/2 border-2 rounded-full"
                    style={{
                      width: `${60 + index * 40}px`,
                      height: `${60 + index * 40}px`,
                      borderColor: finalColor,
                      borderTopColor: 'transparent',
                      borderRightColor: 'transparent',
                      transform: `
                      translate(-50%, -50%)
                      rotate(${progress * (4 + index * 2)}deg)
                    `,
                      opacity: 0.3 - index * 0.1,
                      animation: `spin ${2 - index * 0.3}s linear infinite`,
                    }}
                  />
                ))}
              </>
            )}

            {/* 完成時の波紋エフェクト */}
            {currentPhase === 'complete' && (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`ripple-${index}`}
                    className="absolute top-1/2 left-1/2 rounded-full border-2"
                    style={{
                      width: `${40 + index * 30}px`,
                      height: `${40 + index * 30}px`,
                      borderColor: finalColor,
                      transform: 'translate(-50%, -50%)',
                      opacity: 0.6 - index * 0.15,
                      animation: `ripple 2s ease-out infinite`,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* インクボトルのシルエット */}
          {currentPhase === 'preparing' && (
            <div className="absolute inset-0">
              {selectedInks.map(({ color }) => (
                <div
                  key={`bottle-${color.name}`}
                  className="absolute odd:left-0 even:right-0 nth-[1]:top-0 nth-[2]:top-0 nth-[3]:bottom-0 nth-[4]:bottom-0 size-14 transition-all duration-1000"
                  style={{
                    transform: `translateY(${progress < 10 ? -20 : 0}px)`,
                    opacity: progress < 10 ? 0.5 : 1,
                  }}
                >
                  <img
                    src={color.thumbnails.bottle}
                    alt={color.name}
                    className="size-full object-scale-down"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 選択されたインクの表示 */}
        <div className="flex justify-center items-center gap-4">
          {selectedInks.map(({ color, amount }) => (
            <div
              className="flex flex-col gap-1"
              key={`color-label-${color.name}`}
            >
              <div
                className="size-6 rounded-full border border-theme-gray-primary"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs text-gray-600">×{amount}</span>
            </div>
          ))}
          {currentPhase === 'complete' && (
            <>
              <div className="self-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="size-6 rounded-full border border-theme-gray-primary"
                  style={{ backgroundColor: finalColor }}
                />
                <span className="text-xs text-gray-600 font-bold">完成</span>
              </div>
            </>
          )}
        </div>

        {/* プログレスバー */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 bg-gradient-to-r"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${selectedInks.map((ink) => ink.color.hex).join(', ')}, ${finalColor})`,
            }}
          />
        </div>

        {/* 進行状況 */}
        <div className="text-center text-gray-600">
          <span className="text-lg font-semibold">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* CSS animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes ripple {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
          }
        `,
        }}
      />
    </div>
  )
}
