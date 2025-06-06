import AddInkButton from '../AddInkButton'
import { COLORS } from '@/libs/colors'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import SliderNavButton from '../SliderNavButton'

import 'swiper/css'
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
        modules={[EffectCoverflow]}
        speed={800}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: false,
        }}
        slideToClickedSlide
      >
        {COLORS.map((color) => (
          <SwiperSlide key={color.name} data-color-name={color.name}>
            {({ isActive }) => (
              <div className="grid items-center justify-center gap-6 transition-all duration-300 ease-in-out">
                <div className={isActive ? 'scale-115' : 'opacity-85'}>
                  <div className={isActive ? 'hidden' : 'block'}>
                    <picture>
                      <img
                        src={color.thumbnails.bottle}
                        alt={color.name}
                        width="215"
                        height="163"
                        loading="eager"
                      />
                    </picture>
                  </div>
                  <button
                    type="button"
                    onClick={() => addInk(color)}
                    className={`${isActive ? 'block' : 'hidden'} w-full aspect-[2] cursor-pointer group`}
                    disabled={!isActive}
                    title="色を選択する"
                  >
                    <picture>
                      <img
                        src={color.thumbnails.withOrnaments}
                        alt={color.name}
                        width="516"
                        height="353"
                        loading="eager"
                        className="w-full h-full object-scale-down drop-shadow-md group-hover:drop-shadow-xl group-hover:scale-110 transition-all duration-300"
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
        <nav
          slot="container-end"
          className="absolute z-10 inset-0 m-auto max-w-xl h-fit flex items-center justify-between pointer-events-none [&_>_*]:pointer-events-auto"
        >
          <SliderNavButton direction="prev" />
          <SliderNavButton direction="next" />
        </nav>
      </Swiper>
    </div>
  )
}
