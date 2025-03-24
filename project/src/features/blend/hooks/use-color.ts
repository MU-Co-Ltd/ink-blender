import { COLORS } from '@/libs/colors'

export function useColor() {
  function findColorByHex(hex: string) {
    return COLORS.find((color) => color.hex === hex)
  }

  function findColorByName(name: string) {
    return COLORS.find((color) => color.name === name)
  }

  return { findColorByHex, findColorByName }
}
