import type { TColor } from '@/types'
import { useSelectedInks } from '@/features/blend/providers/SelectedInks'
import { useEffect, useState } from 'react'
import { MAX_INK_COUNT } from '@/libs/constants'

export function useBlender() {
  const { selectedInks, setSelectedInks } = useSelectedInks()
  const [isSelectedMaxInks, toggleIsSelectedMaxInks] = useState<boolean>(false)

  function addInk(ink: TColor) {
    setSelectedInks((prev) => {
      return [...prev, ink]
    })
  }

  function removeInk(ink: TColor) {
    setSelectedInks((prev) => {
      return prev.filter(({ name }) => name !== ink.name)
    })
  }

  function isSelected(ink: TColor) {
    return selectedInks.some(({ name }) => name === ink.name)
  }

  function updateState() {
    if (selectedInks.length === MAX_INK_COUNT) {
      toggleIsSelectedMaxInks(true)
    } else {
      toggleIsSelectedMaxInks(false)
    }
  }

  useEffect(() => {
    updateState()
  }, [selectedInks])

  return { addInk, isSelected, isSelectedMaxInks, removeInk }
}
