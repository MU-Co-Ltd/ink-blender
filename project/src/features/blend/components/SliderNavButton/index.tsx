import { Button } from '@/features/common/components/ui/button'
import { useSwiper } from 'swiper/react'

interface ComponentProps {
  direction?: 'prev' | 'next'
}

export default function SliderNavButton({
  direction = 'next',
}: ComponentProps) {
  const swiper = useSwiper()

  const handleClick = () => {
    if (direction === 'prev') {
      swiper.slidePrev()
    } else {
      swiper.slideNext()
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleClick}
      className="text-theme-gray-primary hover:text-theme-gray-tertiary cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`size-6 ${direction === 'prev' ? 'rotate-180' : ''}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </Button>
  )
}
