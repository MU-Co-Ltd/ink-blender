import { Button } from '@/features/common/components/ui/button'
import { useSwiper } from 'swiper/react'
import { useColor } from '@/features/blend/hooks/use-color'
import { useBlender } from '@/features/blend/hooks/use-blender'

export default function AddInkButton() {
  const swiper = useSwiper()
  const { findColorByName } = useColor()
  const { addInk, isSelectedMaxInks } = useBlender()

  const onClickHandler = () => {
    const activeSlide = swiper.slides[swiper.activeIndex]
    const colorName = activeSlide.getAttribute('data-color-name') || ''
    const color = findColorByName(colorName)

    if (!color) {
      return
    }

    addInk(color)
  }

  return (
    <Button
      className="rounded py-1.5 px-24 border border-theme-gray-primary bg-white text-black hover:bg-white hover:text-black hover:opacity-80 cursor-pointer"
      onClick={onClickHandler}
      disabled={isSelectedMaxInks}
    >
      この色を選ぶ
    </Button>
  )
}
