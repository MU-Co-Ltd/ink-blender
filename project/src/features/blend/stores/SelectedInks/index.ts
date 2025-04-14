import type { TInk } from '@/types'
import { atom } from 'nanostores'

export const $selectedInks = atom<TInk[]>([])
