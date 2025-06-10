import { cn } from '@/libs/utils'
import { useEffect, useRef } from 'react'
import CursorImage from '@/assets/paint-cursor.png'
import { useCanvas } from '@/features/draw/hooks/use-canvas'

interface ComponentProps {
  width?: number
  height?: number
  className?: string
  color: string
}

export default function Canvas({
  width,
  height,
  className,
  color,
}: ComponentProps) {
  const canvasElementRef = useRef<HTMLCanvasElement>(null)
  const cursorImageRef = useRef<HTMLDivElement>(null)
  const { drawLine, getEventPosition, initializeCanvas } = useCanvas()

  useEffect(() => {
    if (!canvasElementRef.current || !cursorImageRef.current) return
    const canvas = canvasElementRef.current
    const cursorImage = cursorImageRef.current
    // canvasの初期化
    initializeCanvas(canvas)
    // canvasのコンテキストを取得
    const canvasCtx = canvas.getContext('2d')
    if (!canvasCtx) {
      console.error('Canvas context is not available.')
      return
    }
    canvasCtx.lineCap = 'butt'
    canvasCtx.lineJoin = 'miter'
    // status propertyを設定
    let isDrawing = false
    let drawStartPosition = { x: 0, y: 0 }
    /** pointerdown */
    canvas.addEventListener('pointerdown', (event) => {
      // カーソルのペン先を降ろす
      cursorImage.classList.remove('-translate-y-3')
      // 描画開始位置を取得
      drawStartPosition = getEventPosition(event, canvas)
      isDrawing = true
    })
    /** pointermove */
    canvas.addEventListener('pointermove', (event) => {
      // カーソルの位置を更新
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      cursorImage.style.left = `${Math.round(x)}px`
      cursorImage.style.top = `${Math.round(y - 35)}px`
      if (!isDrawing) return
      // 描画を行う
      const drawCurrentPosition = getEventPosition(event, canvas)
      drawLine(canvas, drawStartPosition, drawCurrentPosition, color)
      drawStartPosition = drawCurrentPosition // 描画開始位置を更新
    })
    /** pointerup */
    canvas.addEventListener('pointerup', (event) => {
      if (!isDrawing) return
      // 描画終了位置を取得
      const drawEndPosition = getEventPosition(event, canvas)
      // 描画を行う
      drawLine(canvas, drawStartPosition, drawEndPosition, color, true)
      isDrawing = false
      // カーソルのペン先を上げる
      cursorImage.classList.add('-translate-y-3')
    })

    return () => {
      // イベントリスナーのクリーンアップ
      canvas.removeEventListener('pointermove', () => {})
      canvas.removeEventListener('pointerdown', () => {})
      canvas.removeEventListener('pointerup', () => {})
    }
  }, [])

  return (
    <div className="overflow-hidden">
      <canvas
        width={width}
        height={height}
        className={cn(className)}
        ref={canvasElementRef}
      />
      <div
        className="absolute top-1/3 size-fit pointer-events-none transition-transform -translate-y-3"
        ref={cursorImageRef}
      >
        <img
          src={CursorImage}
          alt="マウスカーソル"
          className="w-48 max-w-none"
          width={192}
          height={161}
        />
      </div>
    </div>
  )
}
