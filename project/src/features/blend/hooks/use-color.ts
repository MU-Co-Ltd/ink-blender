import { COLORS } from '@/libs/colors'

export function useColor() {
  /**
   * Get rgb color from hex
   */
  function getRgbColorValue(hex: string) {
    const _hex = hex.replace('#', '')
    const r = parseInt(_hex.substring(0, 2), 16)
    const g = parseInt(_hex.substring(2, 4), 16)
    const b = parseInt(_hex.substring(4, 6), 16)
    return [r, g, b]
  }

  /**
   * Get hex code with `#` from rgb value
   */
  function getHexColorValue(r: number, g: number, b: number) {
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
    getHexColorValue,
    getRgbColorValue,
    isValidRgbColorValue,
  }
}
