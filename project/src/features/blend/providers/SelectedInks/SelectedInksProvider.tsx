import { useState, type ReactNode } from 'react'
import { SelectedInksContext } from '.'
import { TColor } from '@/types'

export default function SelectedInksProvider({
  children,
}: {
  children: ReactNode
}) {
  const [selectedInks, setSelectedInks] = useState<TColor[]>([])

  return (
    <SelectedInksContext.Provider value={{ selectedInks, setSelectedInks }}>
      {children}
    </SelectedInksContext.Provider>
  )
}
