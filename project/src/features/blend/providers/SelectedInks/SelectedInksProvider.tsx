import { useState, type ReactNode } from 'react'
import { SelectedInksContext } from '.'
import type { TInk } from '@/types'

export default function SelectedInksProvider({
  children,
}: {
  children: ReactNode
}) {
  const [selectedInks, setSelectedInks] = useState<TInk[]>([])

  return (
    <SelectedInksContext.Provider value={{ selectedInks, setSelectedInks }}>
      {children}
    </SelectedInksContext.Provider>
  )
}
