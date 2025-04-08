import AddInkButton from '../AddInkButton'
import { COLORS } from '@/libs/colors'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import { useBlender } from '@/features/blend/hooks/use-blender'

export default function InkSelectSlider() {
  const { addInk } = useBlender()

  return (
    <div className="ink-slider">
      <Swiper
        spaceBetween={10}
        slidesPerView={3.5}
        centeredSlides
        loop
        modules={[Navigation, EffectCoverflow]}
        navigation
        speed={800}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: false,
        }}
        initialSlide={0}
      >
        {COLORS.map((color) => (
          <SwiperSlide key={color.name} data-color-name={color.name}>
            {({ isActive }) => (
              <div
                className={
                  'grid items-center justify-center gap-6 transition-all duration-300 ease-in-out'
                }
              >
                <div className={isActive ? 'scale-110' : 'scale-90 opacity-85'}>
                  <div className={isActive ? 'hidden' : 'block'}>
                    <picture>
                      <img
                        src={color.thumbnails.bottle}
                        alt={color.name}
                        width="215"
                        height="163"
                      />
                    </picture>
                  </div>
                  <button
                    type="button"
                    onClick={() => addInk(color)}
                    className={`${isActive ? 'block' : 'hidden'} w-full aspect-[2]`}
                    disabled={!isActive}
                  >
                    <picture>
                      <img
                        src={color.thumbnails.withOrnaments}
                        alt={color.name}
                        width="516"
                        height="353"
                        loading="eager"
                        className="w-full h-full object-scale-down drop-shadow-md"
                      />
                    </picture>
                  </button>
                </div>
                {isActive && (
                  <ul className="space-y-2">
                    {color.keywords.map((keyword) => (
                      <li key={keyword} className="text-center">
                        #{keyword}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
        <div slot="container-end" className="mt-8 text-center">
          <AddInkButton />
        </div>
      </Swiper>
    </div>
  )
}
