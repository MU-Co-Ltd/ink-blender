import { atom } from 'nanostores'
import type { TBlendedColorProperties } from '@/types'

export const $blendedColorProperties = atom<TBlendedColorProperties>({
  name: '',
})
