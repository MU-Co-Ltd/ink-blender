import { Button } from '@/features/common/components/ui/button'
import { useSwiper } from 'swiper/react'

export default function AddInkButton() {
  const swiper = useSwiper()

  const onClickHandler = () => {
    const activeSlide = swiper.slides[swiper.activeIndex]
    console.log(activeSlide)
  }

  return (
    <Button
      className="rounded py-1.5 px-24 border border-theme-gray-primary bg-white text-black hover:bg-white hover:text-black hover:opacity-80 cursor-pointer"
      onClick={onClickHandler}
    >
      この色を選ぶ
    </Button>
  )
}
