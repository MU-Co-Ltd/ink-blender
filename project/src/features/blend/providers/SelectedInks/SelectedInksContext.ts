import type { TColor } from '@/types'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface SelectedInksContextType {
  selectedInks: TColor[]
  setSelectedInks: Dispatch<SetStateAction<TColor[]>>
}

export const SelectedInksContext = createContext<SelectedInksContextType>({
  selectedInks: [],
  setSelectedInks: () => {},
})

export function useSelectedInks() {
  return useContext(SelectedInksContext)
}
