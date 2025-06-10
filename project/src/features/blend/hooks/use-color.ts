import { COLORS } from '@/libs/colors'

export function useColor() {
  /**
   * Get rgb color from hex
   */
  function getRgbFromHex(hex: string) {
    const _hex = hex.replace('#', '')
    const r = parseInt(_hex.substring(0, 2), 16)
    const g = parseInt(_hex.substring(2, 4), 16)
    const b = parseInt(_hex.substring(4, 6), 16)
    return [r, g, b]
  }

  /**
   * Get hsv color from rgb
   */
  function getHsvFromRgb(r: number, g: number, b: number) {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    let h: number = 0
    const s = max === 0 ? 0 : delta / max
    const v = max

    if (max === min) {
      h = 0 // achromatic
    } else {
      switch (max) {
        case r:
          h = (g - b) / delta + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / delta + 2
          break
        case b:
          h = (r - g) / delta + 4
          break
      }

      h /= 6
    }

    return [h, s, v]
  }

  /**
   * Get rgb color from hsv
   */
  function getRgbFromHsv(h: number, s: number, v: number) {
    let r: number = 0
    let g: number = 0
    let b: number = 0

    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)

    switch (i % 6) {
      case 0:
        r = v
        g = t
        b = p
        break
      case 1:
        r = q
        g = v
        b = p
        break
      case 2:
        r = p
        g = v
        b = t
        break
      case 3:
        r = p
        g = q
        b = v
        break
      case 4:
        r = t
        g = p
        b = v
        break
      case 5:
        r = v
        g = p
        b = q
        break
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  }

  /**
   * Get hex code with `#` from rgb value
   */
  function getHexFromRgb(r: number, g: number, b: number) {
    const hex = [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
    return `#${hex}`
  }

  /**
   * Check rgb color value is not `NaN` and is in range of 0-255
   */
  function isValidRgbColorValue(value: number) {
    return !isNaN(value) && value >= 0 && value <= 255
  }

  /**
   * Find color by hex from the preset colors
   */
  function findColorByHex(hex: string) {
    return COLORS.find((color) => color.hex === hex)
  }

  /**
   * Find color by name from the preset colors
   */
  function findColorByName(name: string) {
    return COLORS.find((color) => color.name === name)
  }

  return {
    findColorByHex,
    findColorByName,
    getHexFromRgb,
    getHsvFromRgb,
    getRgbFromHex,
    getRgbFromHsv,
    isValidRgbColorValue,
  }
}
