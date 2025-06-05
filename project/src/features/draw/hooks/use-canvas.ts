import { useColor } from '@/features/blend/hooks/use-color'
import { useCallback } from 'react'

export function useCanvas() {
  const { getRgbColorValue, isValidRgbColorValue } = useColor()

  const initializeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    canvas.style.width = `${canvas.clientWidth}px`
    canvas.style.height = `${canvas.clientHeight}px`
    canvas.width = canvas.clientWidth * window.devicePixelRatio
    canvas.height = canvas.clientHeight * window.devicePixelRatio
  }, [])

  const getEventPosition = useCallback(
    (event: PointerEvent, canvas: HTMLCanvasElement) => {
      const { top, left } = canvas.getBoundingClientRect()
      const scaleX = canvas.width / canvas.clientWidth
      const scaleY = canvas.height / canvas.clientHeight
      const x = (event.clientX - left) * scaleX
      const y = (event.clientY - top) * scaleY
      return { x, y }
    },
    []
  )

  const resetCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('Canvas context is not available.')
      return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  const drawLine = useCallback(
    (
      canvas: HTMLCanvasElement,
      start: { x: number; y: number },
      end: { x: number; y: number },
      color: string = '#000000',
      isEnd: boolean = false
    ) => {
      const rgbColor = getRgbColorValue(color)
      rgbColor.forEach((value) => {
        if (!isValidRgbColorValue(value)) {
          console.error('Invalid RGB color value:', value)
          return
        }
      })
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        console.error('Canvas context is not available.')
        return
      }
      const distance = Math.hypot(end.x - start.x, end.y - start.y)
      const maxLineWidth = 10
      const minLineWidth = 2
      const maxAlpha = 1
      const minAlpha = 0.2

      let lineWidth = maxLineWidth
      let alpha = maxAlpha

      if (isEnd) {
        lineWidth = minLineWidth
        alpha = minAlpha
      } else {
        lineWidth =
          minLineWidth + (maxLineWidth - minLineWidth) * (distance / 100)
        alpha = minAlpha + (maxAlpha - minAlpha) * (distance / 100)
      }

      ctx.lineWidth = lineWidth
      ctx.strokeStyle = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${alpha})`
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
      ctx.closePath()
    },
    []
  )

  return {
    initializeCanvas,
    getEventPosition,
    resetCanvas,
    drawLine,
  }
}
