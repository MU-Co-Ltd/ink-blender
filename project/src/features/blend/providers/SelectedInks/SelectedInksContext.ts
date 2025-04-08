import type { TInk } from '@/types'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface SelectedInksContextType {
  selectedInks: TInk[]
  setSelectedInks: Dispatch<SetStateAction<TInk[]>>
}

export const SelectedInksContext = createContext<SelectedInksContextType>({
  selectedInks: [],
  setSelectedInks: () => {},
})

export function useSelectedInks() {
  return useContext(SelectedInksContext)
}
