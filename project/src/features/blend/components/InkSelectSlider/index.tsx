import AddInkButton from '../AddInkButton'
import { COLORS } from '@/libs/colors'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

export default function InkSelectSlider() {
  return (
    <div className="ink-slider">
      <Swiper spaceBetween={0} slidesPerView={'auto'} centeredSlides loop>
        {COLORS.map(({ name, keywords, thumbnails }) => (
          <SwiperSlide key={name} data-color-name={name}>
            {({ isActive }) => (
              <div className="grid items-center justify-center gap-6 min-h-80">
                {isActive ? (
                  <>
                    <div>
                      <picture>
                        <img
                          src={thumbnails.withOrnaments}
                          alt={name}
                          width="516"
                          height="353"
                          loading="lazy"
                          className="drop-shadow-md"
                        />
                      </picture>
                    </div>
                    <ul className="space-y-3">
                      {keywords.map((keyword) => (
                        <li key={keyword} className="text-center">
                          #{keyword}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div>
                    <picture>
                      <img
                        src={thumbnails.bottle}
                        alt={name}
                        width="215"
                        height="163"
                      />
                    </picture>
                  </div>
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
