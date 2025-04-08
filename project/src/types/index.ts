export type TColor = {
  hex: string
  name: string
  thumbnails: {
    bottle: string
    withSample: string
    withOrnaments: string
  }
  keywords: string[]
}

export type TInk = {
  color: TColor
  amount: number
}
