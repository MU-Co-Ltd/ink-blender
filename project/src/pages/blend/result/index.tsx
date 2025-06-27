import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useBlender } from '@/features/blend/hooks/use-blender'
import BlendResultBottle from '@/assets/blended-bottle.svg'
import RecipeCard from '@/features/blend/components/RecipeCard'
import {
  blendResultFormSchema,
  type BlendResultFormSchema,
} from '@/features/blend/schemas/blend-result'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/features/common/components/ui/form'
import ResultFormSubmitButton from '@/features/blend/components/ResultFormSubmitButton'
import TestDrawingDialog from '@/features/blend/components/TestDrawingDialog'
import Canvas from '@/features/draw/components/Canvas'
import InkDropAnimation from '@/features/blend/components/InkDropAnimation'
import { useState } from 'react'
import { Button } from '@/features/common/components/ui/button'

export const Route = createFileRoute('/blend/result/')({
  component: RouteComponent,
})

function RouteComponent() {
  // loadingフラグ
  const [isBlending, toggleIsBlending] = useState(true)
  // ナビゲーションを扱うためのフック
  const navigate = useNavigate()
  // ブレンドの状態を取得するためのカスタムフック
  const { canBlend, getBlendedInkHex, setBlendedColorName } = useBlender()
  // ブレンドされたインクの色を取得
  const blendedInkColor = getBlendedInkHex()
  // フォームの初期化
  const blendResultForm = useForm<BlendResultFormSchema>({
    resolver: zodResolver(blendResultFormSchema),
    defaultValues: { inkName: '' },
  })
  // フォームの送信処理
  const handleOnSubmit = ({ inkName }: BlendResultFormSchema) => {
    // フォームデータをstoreに保存する
    setBlendedColorName(inkName)
    // 標本プレビューページへリダイレクト
    navigate({ to: '/blend/result/preview', replace: true })
  }
  // ブレンド中のアニメーションを表示
  if (isBlending && canBlend) {
    return (
      <InkDropAnimation
        duration={9000}
        isVisible={isBlending}
        onComplete={() => toggleIsBlending(false)}
      />
    )
  }

  return (
    <div>
      <h1 className="flex flex-col items-center justify-center">
        <span className="text-3xl text-theme-black-primary">ブレンド完了</span>
        <span
          className="text-theme-black-primary"
          style={{ color: blendedInkColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="194"
            height="7"
            viewBox="0 0 194 7"
            fill="none"
          >
            <path
              d="M4.43004 3.65003C5.83004 3.53003 7.22004 3.36003 8.62004 3.29003C10.46 3.20003 12.3 3.11003 14.14 3.16003C19.41 3.31003 24.66 3.11003 29.92 2.83003C31.06 2.77003 32.2 2.72003 33.34 2.67003C37.55 2.47003 41.76 2.38003 45.95 2.05003C50.94 1.66003 55.93 1.59003 60.92 1.33003C67.05 1.01003 73.2001 1.12003 79.33 0.850025C87.22 0.510025 95.11 0.580025 103.01 0.610025C108.71 0.630025 114.41 0.620025 120.11 0.610025C125.9 0.600025 131.69 0.600025 137.48 0.540025C139.58 0.520025 141.69 0.340025 143.79 0.240025C148.08 0.0200253 152.38 -0.0499747 156.68 0.0400253C161.24 0.140025 165.8 0.0700253 170.36 0.320025C177.37 0.710025 184.39 0.570025 191.4 0.600025C192.09 0.600025 192.56 0.930025 192.87 1.52003C193.25 2.23003 193.18 2.87003 192.69 3.47003C192.21 4.07003 191.58 4.39003 190.84 4.13003C189.66 3.73003 188.44 3.66003 187.21 3.61003C184.15 3.48003 181.08 3.29003 178.02 3.20003C175.92 3.13003 173.82 3.05003 171.72 2.86003C169.63 2.67003 167.52 2.69003 165.41 2.66003C162.08 2.60003 158.75 2.56003 155.41 2.54003C153.13 2.53003 150.85 2.52003 148.57 2.59003C142.78 2.75003 137 3.00003 131.21 3.10003C126.83 3.18003 122.44 3.07003 118.05 3.06003C116.3 3.06003 114.55 3.10003 112.79 3.10003C109.81 3.10003 106.83 3.12003 103.84 3.06003C100.25 2.99003 96.65 2.92003 93.06 2.99003C88.24 3.07003 83.41 3.07003 78.59 3.16003C74.47 3.24003 70.3501 3.23003 66.23 3.52003C63.26 3.73003 60.27 3.74003 57.29 3.85003C53.26 4.01003 49.23 4.15003 45.22 4.59003C44.96 4.62003 44.7 4.63002 44.43 4.64003C39.26 4.88002 34.09 5.11003 28.93 5.36003C27.62 5.42003 26.31 5.59003 25 5.67003C21.67 5.86003 18.34 5.87003 15 5.80003C12.98 5.75003 10.97 5.81003 8.96004 6.11003C6.88004 6.42003 4.78004 6.59003 2.69004 6.81003C2.43004 6.84003 2.16004 6.86003 1.91004 6.84003C1.17004 6.77003 0.570043 6.43003 0.190043 5.78003C-0.349957 4.86003 0.230043 3.69003 1.27004 3.61003C1.62004 3.58003 1.97004 3.59003 2.32004 3.59003C3.02004 3.59003 3.72004 3.59003 4.42004 3.59003C4.42004 3.62003 4.42004 3.64003 4.42004 3.67003L4.43004 3.65003Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </h1>
      <div className="mt-16">
        <Form {...blendResultForm}>
          <form
            onSubmit={blendResultForm.handleSubmit(handleOnSubmit)}
            className="space-y-12"
          >
            <FormField
              control={blendResultForm.control}
              name="inkName"
              render={({ field, fieldState }) => (
                <FormItem className="max-w-prose mx-auto space-y-2">
                  <FormControl>
                    <div
                      className={`relative z-1 flex justify-center border-b pb-3 transition-colors focus-within:border-b-2 focus-within:pb-[11px] ${fieldState.invalid ? 'border-theme-red-primary' : 'border-theme-gray-primary focus-within:border-[var(--border-color,theme(--color-theme-gray-primary))]'}`}
                      style={
                        {
                          '--border-color': blendedInkColor,
                        } as React.CSSProperties
                      }
                    >
                      <input
                        type="text"
                        className={`text-xl focus:w-full focus-visible:w-full text-center py-1 px-3 max-w-full focus:outline-none focus:border-none focus-visible:outline-none focus-visible:border-none ${fieldState.isDirty ? 'w-full' : 'w-fit'}`}
                        {...field}
                      />
                      <p
                        className={`absolute -z-1 inset-0 w-fit h-fit m-auto text-xl text-theme-gray-primary items-center gap-2 pointer-events-none [input:focus~&]:invisible [input:focus-visible~&]:invisible ${fieldState.isDirty ? 'hidden' : 'flex'}`}
                      >
                        <span>この色に名前をつける</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="18"
                            viewBox="0 0 19 18"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_279_1086)">
                              <path
                                d="M6.31702 16.2252C6.31702 16.2252 6.34626 16.196 6.38183 16.1604L13.241 9.3012C13.2766 9.26562 13.3086 9.23357 13.3122 9.23005L13.3833 9.1589L17.0176 5.52466C17.0176 5.52466 17.0183 5.5229 17.0176 5.5222L12.961 1.46565C12.961 1.46565 12.9592 1.46494 12.9585 1.46565L9.3243 5.09988L9.25315 5.17103L9.182 5.24218L2.25836 12.1658C2.25836 12.1658 2.25836 12.1662 2.25801 12.1665L0.483154 17.9979C0.483154 17.9979 0.483859 18.0004 0.485268 18L6.22932 16.252C6.27757 16.2372 6.31702 16.2252 6.31702 16.2252ZM1.77687 16.7042L2.66306 13.7924C2.66306 13.7924 2.66482 13.7906 2.66588 13.7917L4.69151 15.8173C4.69151 15.8173 4.69187 15.8198 4.69081 15.8201L1.77898 16.7063C1.77898 16.7063 1.77652 16.7056 1.77687 16.7042Z"
                                fill="currentColor"
                              />
                              <path
                                d="M18.1788 3.66136C18.6297 3.21051 18.6297 2.4726 18.1788 2.02141L16.4956 0.338134C16.0447 -0.112711 15.3068 -0.112711 14.8556 0.338134L14.0152 1.17854C14.0152 1.17854 14.0145 1.1803 14.0152 1.181L17.336 4.50176C17.336 4.50176 17.3377 4.50247 17.3384 4.50176L18.1788 3.66136Z"
                                fill="currentColor"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_279_1086">
                                <rect
                                  width="18.0338"
                                  height="18"
                                  fill="white"
                                  transform="translate(0.483154)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/** @memo color name input */}
            <div className="flex items-center gap-10 max-w-3xl mx-auto">
              <div className="flex flex-col items-center basis-1/4 shrink-0">
                <div className="relative z-1">
                  <div
                    className="absolute -z-1 left-0.25 bottom-0.25 right-0.25 h-1/2"
                    style={{ backgroundColor: blendedInkColor }}
                  />
                  <div>
                    <picture>
                      <img src={BlendResultBottle} width="68" height="168" />
                    </picture>
                  </div>
                </div>
                <div
                  className="w-full [&_svg]:w-full [&_svg]:h-auto -mt-4"
                  style={{ color: blendedInkColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="202"
                    height="50"
                    viewBox="0 0 202 50"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_59_496)">
                      <path
                        d="M127.833 0.5L130.763 1.15549C130.976 5.30066 125.235 5.15084 123.397 7.9351L125.028 8.04122L143.771 2.21051C148.577 2.47895 147.51 5.59407 144.128 7.32331C142.673 8.06619 141.505 8.02874 140.238 8.54688C137.22 9.76422 131.504 12.4361 128.68 14.0155C128.209 14.2777 127.682 14.284 127.845 15.0456C134.459 12.8856 141.054 10.4759 147.743 8.52816C151.432 7.4544 155.404 5.80632 159.25 6.96123C159.439 7.87267 159.062 8.67174 158.441 9.3085C158.278 9.47705 155.893 10.4696 157.399 10.3136C159.52 10.0951 162.978 8.57185 165.287 7.96631C168.386 7.161 171.555 6.56794 174.655 5.7439C177.146 5.08217 178.438 3.8898 181.293 4.25188C182.122 4.35801 183.759 4.80124 183.904 5.75014C184.274 8.20978 180.691 8.57185 179.022 9.37717C177.98 9.88283 177.171 10.6819 176.023 11.1439C174.14 11.9055 171.649 11.6121 170.557 13.3413L189.181 8.67798L193.31 9.27104L193.655 9.97647C193.04 12.8544 191.295 11.7869 189.921 12.6359C189.551 12.8669 189.444 13.7346 189.024 14.1966C187.487 15.8883 173.036 21.1322 169.648 22.7553C168.713 23.2048 167.401 23.6356 166.805 24.5033C167.395 24.5782 167.953 24.4471 168.531 24.3535C175.747 23.1861 187.945 17.8673 194.615 18.4603C196.623 18.6414 199.478 18.8474 198.198 21.2508C197.219 23.0862 195.637 22.4307 194.822 22.9801C194.495 23.1986 194.458 24.0975 193.799 24.6719C192.431 25.858 189.319 25.7831 188.34 27.5498C190.931 27.9368 198.543 24.4534 200.406 24.8966C201.115 25.0652 201.799 26.6695 202 27.3687C201.868 27.993 200.262 27.8994 199.829 28.1928C199.478 28.4362 199.653 29.1541 199.289 29.4163C198.649 29.8721 195.393 29.9095 194.15 30.4277C192.789 30.9958 192.368 32.2443 190.48 32.544C188.352 32.8811 187.518 31.5014 185.604 32.288L185.949 33.6364C183.245 33.5303 180.44 35.0286 177.886 35.2908C176.851 35.3969 174.818 34.9786 174.536 35.0473C174.297 35.1035 171.888 37.6006 170.677 37.9689C169.466 38.3372 168.261 37.5132 167.407 37.7441C166.918 37.8752 166.592 38.5807 166.109 38.8554C164.013 40.0415 163.166 38.5994 162.582 38.7367C162.212 38.8241 161.817 39.9603 161.145 40.3661C159.47 41.3774 152.204 41.6334 151.275 39.7293C149.832 36.7765 153.001 36.1086 154.764 35.0723C155.14 34.8475 155.711 34.8288 155.027 34.3106L134.716 40.9217C132.432 41.3212 128.793 42.1141 126.961 40.2849C124.081 37.4008 129.333 36.2521 130.6 34.1421C130.65 33.8799 130.293 33.9423 130.085 33.9735C124.94 34.7164 116.683 39.9041 111.638 40.4036C110.402 40.5284 107.095 40.3099 106.311 39.2486C105.445 38.075 106.361 37.1823 106.687 36.1835C106.806 35.8151 107.289 35.9213 106.505 35.3469C101.786 37.2198 96.9801 39.9041 92.1548 41.4274C90.1218 42.0704 86.2001 43.3689 84.4495 41.6084C81.4941 38.6306 89.9587 36.5268 89.2433 35.6778C88.7602 35.6029 88.4715 35.4531 87.9507 35.5592C84.1608 36.3208 78.9214 39.8604 74.9056 40.5971C73.1424 40.9217 68.474 41.3212 69.2144 38.3622C69.3839 37.6817 72.0004 35.9525 72.6655 35.3345C72.9354 35.0847 73.5565 34.6602 73.0169 34.3294L52.279 44.917C48.671 45.9721 45.3454 45.3291 48.922 41.5959C48.9722 41.34 48.6083 41.3899 48.42 41.4336C43.7893 42.6197 37.7844 46.4278 33.0972 48.2507C32.1246 48.6252 30.2045 49.5304 29.2696 49.4992C28.41 49.4742 23.7729 46.2031 23.6726 45.61C24.0114 44.4176 25.2224 43.9432 26.2138 43.4625L25.8624 42.782L21.0999 43.45C20.1211 42.7383 21.7713 41.6646 19.8763 42.2639C16.9963 43.1753 10.3011 47.8761 7.74732 47.7076C7.27044 47.6763 6.86259 47.3704 6.56767 47.0146C6.51748 46.3654 9.22188 44.6112 9.87445 44.2054C14.7625 41.1402 20.6983 38.8117 25.7056 35.8588C26.0758 35.6403 26.6468 35.5155 26.7221 35.0098C21.6646 36.2958 16.4566 37.5569 11.6 39.4859C9.47914 40.3286 2.75265 44.2428 1.002 43.7497C-0.748646 43.2565 0.12354 40.9342 1.13377 39.9478C3.01618 38.1125 12.9302 34.6041 13.564 33.3118C13.8087 32.8186 13.6769 32.1631 13.9279 31.6388C14.4675 30.5026 18.5649 28.5424 19.8701 27.7121C31.8422 20.1334 47.1212 10.4634 59.9404 4.80749C63.3288 3.31547 67.2003 0.000581205 68.3674 6.01858L63.6362 9.30225C66.3595 8.59683 68.4929 8.70295 69.4843 11.637L82.6235 4.93234C86.8652 4.2831 85.7295 8.75289 86.7272 8.95266L104.554 2.96588C108.827 2.30415 108.563 5.41927 111.299 5.26321L127.538 0.512485H127.877L127.833 0.5Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_59_496">
                        <rect
                          width="202"
                          height="49"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="grow">
                <RecipeCard />
              </div>
            </div>
            {/** @memo blend details */}
            <div className="space-y-7">
              <div className="grid grid-cols-2 gap-5 max-w-xl mx-auto">
                <Link
                  to="/blend"
                  className="w-full h-auto flex items-center justify-center gap-2 py-1.5 px-4 border-2 border-black rounded text-black hover:opacity-50"
                >
                  <span className="text-xl">ひとつ戻る</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M12.8038 4.65704C11.768 3.61812 10.3168 2.97003 8.73306 2.97088H6.26579V0.515503L0.155937 6.73036H8.73306C9.29058 6.73121 9.77792 6.9511 10.1453 7.31505C10.5098 7.68268 10.7294 8.17002 10.7305 8.72754C10.7297 9.28507 10.5098 9.77241 10.1453 10.1398C9.77821 10.5043 9.29058 10.7239 8.73306 10.725H0V14.4845H8.73306C10.3168 14.4853 11.768 13.8373 12.8038 12.7983C13.8428 11.7625 14.4909 10.3113 14.49 8.72754C14.4909 7.14383 13.843 5.69257 12.8038 4.65676V4.65704Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </Link>
                <TestDrawingDialog>
                  <Canvas
                    width={800}
                    height={650}
                    color={blendedInkColor}
                    className="relative z-1 size-full bg-slate-50/50"
                  />
                </TestDrawingDialog>
              </div>
              <div className="max-w-sm mx-auto">
                <ResultFormSubmitButton />
              </div>
            </div>
            {/** @memo action buttons */}
          </form>
        </Form>
      </div>
    </div>
  )
}
