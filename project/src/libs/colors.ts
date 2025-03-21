import type { TColor } from '@/types'
import yellowBottle from '@/assets/yellow.png'
import yellowWithSample from '@/assets/yellow_sample.png'
import yellowWithOrnaments from '@/assets/yellow_ornaments.png'
import pinkBottle from '@/assets/pink.png'
import pinkWithSample from '@/assets/pink_sample.png'
import pinkWithOrnaments from '@/assets/pink_ornaments.png'
import redBottle from '@/assets/red.png'
import redWithSample from '@/assets/red_sample.png'
import redWithOrnaments from '@/assets/red_ornaments.png'
import purpleBottle from '@/assets/purple.png'
import purpleWithSample from '@/assets/purple_sample.png'
import purpleWithOrnaments from '@/assets/purple_ornaments.png'
import lightBlueBottle from '@/assets/light-blue.png'
import lightBlueWithSample from '@/assets/light-blue_sample.png'
import lightBlueWithOrnaments from '@/assets/light-blue_ornaments.png'
import blueBottle from '@/assets/blue.png'
import blueWithSample from '@/assets/blue_sample.png'
import blueWithOrnaments from '@/assets/blue_ornaments.png'
import lightGreenBottle from '@/assets/light-green.png'
import lightGreenWithSample from '@/assets/light-green_sample.png'
import lightGreenWithOrnaments from '@/assets/light-green_ornaments.png'
import ocherBottle from '@/assets/ocher.png'
import ocherWithSample from '@/assets/ocher_sample.png'
import ocherWithOrnaments from '@/assets/ocher_ornaments.png'
import lampBlackBottle from '@/assets/lamp-black.png'
import lampBlackWithSample from '@/assets/lamp-black_sample.png'
import lampBlackWithOrnaments from '@/assets/lamp-black_ornaments.png'

export const COLORS: TColor[] = [
  {
    hex: '#FFAF0E',
    name: 'yellow',
    thumbnails: {
      bottle: yellowBottle,
      withSample: yellowWithSample,
      withOrnaments: yellowWithOrnaments,
    },
    keywords: ['ゴールデンアワー'],
  },
  {
    hex: '#FF2A5F',
    name: 'pink',
    thumbnails: {
      bottle: pinkBottle,
      withSample: pinkWithSample,
      withOrnaments: pinkWithOrnaments,
    },
    keywords: ['春宵の並木道'],
  },
  {
    hex: '#EF0014',
    name: 'red',
    thumbnails: {
      bottle: redBottle,
      withSample: redWithSample,
      withOrnaments: redWithOrnaments,
    },
    keywords: ['クリスマスのショーウィンドウ', 'ミニシネマの座席'],
  },
  {
    hex: '#7F1184',
    name: 'purple',
    thumbnails: {
      bottle: purpleBottle,
      withSample: purpleWithSample,
      withOrnaments: purpleWithOrnaments,
    },
    keywords: ['フィンランドのオーロラ'],
  },
  {
    hex: '#13CAE9',
    name: 'light-blue',
    thumbnails: {
      bottle: lightBlueBottle,
      withSample: lightBlueWithSample,
      withOrnaments: lightBlueWithOrnaments,
    },
    keywords: ['プールサイド'],
  },
  {
    hex: '#0156C1',
    name: 'blue',
    thumbnails: {
      bottle: blueBottle,
      withSample: blueWithSample,
      withOrnaments: blueWithOrnaments,
    },
    keywords: ['ウォーターフロント'],
  },
  {
    hex: '#04B395',
    name: 'light-green',
    thumbnails: {
      bottle: lightGreenBottle,
      withSample: lightGreenWithSample,
      withOrnaments: lightGreenWithOrnaments,
    },
    keywords: ['鳥の羽', 'お気に入りのイヤリング'],
  },
  {
    hex: '#B28000',
    name: 'ocher',
    thumbnails: {
      bottle: ocherBottle,
      withSample: ocherWithSample,
      withOrnaments: ocherWithOrnaments,
    },
    keywords: ['カフェのコーヒー'],
  },
  {
    hex: '#24140E',
    name: 'lamp-black',
    thumbnails: {
      bottle: lampBlackBottle,
      withSample: lampBlackWithSample,
      withOrnaments: lampBlackWithOrnaments,
    },
    keywords: ['ビンテージなカメラ'],
  },
]
