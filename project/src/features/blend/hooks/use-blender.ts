import type { TColor } from '@/types'
import { useEffect, useState } from 'react'
import { MAX_INK_COUNT, MAX_DROPS_COUNT } from '@/libs/constants'
import { useStore } from '@nanostores/react'
import { $selectedInks } from '@/features/blend/stores/SelectedInks'
import { useColor } from './use-color'

export function useBlender() {
  const selectedInks = useStore($selectedInks)
  const [isSelectedMaxInks, toggleIsSelectedMaxInks] = useState<boolean>(false)
  const [isSelectedMaxAmount, toggleIsSelectedMaxAmount] =
    useState<boolean>(false)
  const [canBlend, setCanBlend] = useState<boolean>(false)
  const { getHexColorValue, getRgbColorValue, isValidRgbColorValue } =
    useColor()

  /**
   * Add ink to the selected inks
   */
  function addInk(color: TColor) {
    // If the maximum number of drops is reached, do nothing
    if (isSelectedMaxAmount) return
    // If the maximum number of inks is reached, do nothing
    if (isSelectedMaxInks) return
    // If the ink is already selected, increase the amount of the selected ink
    if (isSelected(color)) {
      increaseInkAmount(color)
      return
    }
    // If the ink is not selected, add it to the selected inks
    $selectedInks.set([...selectedInks, { color, amount: 1 }])
  }

  /**
   * Remove ink from the selected inks
   */
  function removeInk(target: TColor) {
    $selectedInks.set(
      selectedInks.filter(({ color }) => color.name !== target.name)
    )
  }

  /**
   * Check if the ink is selected
   */
  function isSelected(test: TColor) {
    return selectedInks.some(({ color }) => color.name === test.name)
  }

  function increaseInkAmount(target: TColor) {
    // If the maximum number of drops is reached, do nothing
    if (isSelectedMaxAmount) return
    // If the ink is not selected, do nothing
    if (!isSelected(target)) return
    // If the ink is selected, increase the amount of the selected ink
    $selectedInks.set(
      selectedInks.map((ink) => {
        if (ink.color.name === target.name) {
          return { ...ink, amount: ink.amount + 1 }
        }
        return ink
      })
    )
  }

  function decreaseInkAmount(target: TColor) {
    // If the ink is not selected, do nothing
    if (!isSelected(target)) return
    // If the ink amount is 1, remove the ink from the selected inks
    if (
      selectedInks.find(({ color }) => color.name === target.name)?.amount === 1
    ) {
      removeInk(target)
      return
    }
    // If the ink is selected, decrease the amount of the selected ink
    $selectedInks.set(
      selectedInks.map((ink) => {
        if (ink.color.name === target.name) {
          return { ...ink, amount: ink.amount - 1 }
        }
        return ink
      })
    )
  }

  function updateState() {
    const selectedInksAmount = selectedInks.reduce(
      (acc, { amount }) => acc + amount,
      0
    )
    if (selectedInksAmount >= MAX_DROPS_COUNT) {
      toggleIsSelectedMaxAmount(true)
    } else {
      toggleIsSelectedMaxAmount(false)
    }

    if (selectedInks.length >= MAX_INK_COUNT) {
      toggleIsSelectedMaxInks(true)
    } else {
      toggleIsSelectedMaxInks(false)
    }

    // ブレンド開始可能条件の確認：2種類以上のインクかつ合計量が4
    setCanBlend(selectedInks.length >= 2 && selectedInksAmount === 4)
  }

  /**
   * Get result blending ink color hex code
   */
  function getBlendedInkHex() {
    const blendedInk = selectedInks.reduce(
      (acc, { color, amount }) => {
        const [r, g, b] = getRgbColorValue(color.hex)
        acc.r += r * amount
        acc.g += g * amount
        acc.b += b * amount
        return acc
      },
      { r: 0, g: 0, b: 0 }
    )

    // Check if the blended ink color is valid
    if (
      !isValidRgbColorValue(blendedInk.r) ||
      !isValidRgbColorValue(blendedInk.g) ||
      !isValidRgbColorValue(blendedInk.b)
    ) {
      console.error('Invalid blended ink color:', blendedInk)
      return getHexColorValue(0, 0, 0)
    }

    const blendedInkHex = getHexColorValue(
      Math.floor(blendedInk.r / selectedInks.length),
      Math.floor(blendedInk.g / selectedInks.length),
      Math.floor(blendedInk.b / selectedInks.length)
    )

    return blendedInkHex
  }

  useEffect(() => {
    updateState()
  }, [selectedInks])

  return {
    addInk,
    decreaseInkAmount,
    getBlendedInkHex,
    increaseInkAmount,
    isSelected,
    isSelectedMaxAmount,
    isSelectedMaxInks,
    removeInk,
    canBlend,
  }
}
