import { createFileRoute, Link } from '@tanstack/react-router'
import LogoImage from '@/assets/logo-full.png'
import TopOrnamentImage from '@/assets/top-ornament.png'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="relative z-1 size-full flex justify-center items-center">
      <div className="absolute -z-1 inset-0">
        <picture>
          <img
            src={TopOrnamentImage}
            alt="ペンの筆跡"
            width="1280"
            height="832"
            className="size-full object-fill object-center"
          />
        </picture>
      </div>
      <div>
        <div>
          <picture>
            <img
              src={LogoImage}
              alt="手が汚れない！インクブレンダー"
              width="650"
              height="137"
            />
          </picture>
        </div>
        <div className="text-center mt-3">
          <Link
            to="/blend"
            className="inline-block py-3 px-10 text-xl uppercase rounded-md hover:underline hover:shadow hover:bg-white"
          >
            start
          </Link>
        </div>
      </div>
    </main>
  )
}
