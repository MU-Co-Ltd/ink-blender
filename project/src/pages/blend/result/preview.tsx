import { useBlender } from '@/features/blend/hooks/use-blender'
import { $blendedColorProperties } from '@/features/blend/stores/BlendedColorProperties'
import DownloadCardButton from '@/features/preview/components/DownloadCardButton'
import PreviewCard from '@/features/preview/components/PreviewCard'
import ResultPaint from '@/features/preview/components/ResultPaint'
import { generateFileName } from '@/libs/utils'
import { useStore } from '@nanostores/react'
import { createFileRoute, Link, useBlocker } from '@tanstack/react-router'
import html2canvas from 'html2canvas-pro'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/features/common/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/features/common/components/ui/dialog'

export const Route = createFileRoute('/blend/result/preview')({
  component: RouteComponent,
})

function RouteComponent() {
  const { getBlendedInkHex, selectedInks } = useBlender()
  const { name: inkName } = useStore($blendedColorProperties)
  const blendedInkHex = getBlendedInkHex()
  const previewCardRef = useRef<HTMLDivElement>(null)
  const [downloadStatus, setDownloadStatus] = useState<
    'idle' | 'downloading' | 'completed'
  >('idle')
  const { canBlend, reset: resetBlendState } = useBlender()
  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: ({ next }) =>
      canBlend && next.pathname !== '/blend/result/preview',
    withResolver: true,
  })
  // ブロックを解除する処理
  const handleOnProceed = () => {
    if (!proceed) return
    resetBlendState()
    proceed()
  }
  // ダウンロード
  const handleDownload = () => {
    if (!previewCardRef.current || !inkName || selectedInks.length === 0) {
      toast.error('画像のダウンロードに失敗しました。')
      return
    }
    let success = false
    setDownloadStatus('downloading')
    // 画像のダウンロード処理
    html2canvas(previewCardRef.current)
      .then((canvas) => {
        const fileName = generateFileName(inkName)
        if (!fileName) {
          throw new Error('無効なファイル名です。')
        }
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/jpg')
        link.download = fileName
        link.click()
        link.remove()
        success = true
      })
      .catch((error) => {
        toast.error(error?.message)
        setDownloadStatus('idle')
      })
      .finally(() => {
        if (success) {
          setDownloadStatus('completed')
        } else {
          setDownloadStatus('idle')
        }
      })
  }

  return (
    <>
      <div className="space-y-16 pt-16">
        <div className="max-w-3xl mx-auto animate-in duration-1000 fade-in-0">
          <PreviewCard ref={previewCardRef} enable3D={true}>
            <div className="flex items-center gap-7">
              <div className="flex flex-col items-center gap-2 basis-1/3 shrink-0">
                <div className="size-44 2xl:size-48">
                  <ResultPaint color={blendedInkHex} />
                </div>
                <div
                  className="w-full [&_svg]:w-full [&_svg]:h-auto"
                  style={{ color: blendedInkHex }}
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
              <div className="grow space-y-5">
                <p className="text-xl">No.001</p>
                <h1 className="text-3xl">{inkName}</h1>
                <div>
                  <p className="text-xl">使ったインク</p>
                  <ul className="flex gap-2.5 mt-4">
                    {selectedInks.map(({ color }) => (
                      <li
                        key={color.name}
                        className="size-14 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="sr-only">{color.hex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </PreviewCard>
        </div>
        {/** @memo preview card */}
        <div>
          <div className="max-w-sm mx-auto">
            <DownloadCardButton
              onClick={handleDownload}
              submitting={downloadStatus === 'downloading'}
            />
          </div>
          {/** @memo download button */}
          <div className="text-center mt-10">
            <Link
              to="/"
              className="inline-block py-3 px-10 text-xl rounded-md hover:underline hover:shadow hover:bg-white"
            >
              TOPへ
            </Link>
          </div>
          {/** @memo back to TOP */}
        </div>
      </div>

      <Dialog
        open={status === 'blocked'}
        onOpenChange={(open) => {
          if (!open && reset) reset()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ページを離れようとしています</DialogTitle>
            <DialogDescription>
              ページを離れると、現在のブレンド結果が失われます。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-theme-gray-primary text-theme-gray-tertiary hover:bg-theme-gray-primary hover:text-theme-gray-tertiary cursor-pointer rounded hover:opacity-50"
                size="sm"
              >
                キャンセル
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="bg-theme-orage-primary hover:bg-theme-orage-primary/75 text-white cursor-pointer rounded"
              size="sm"
              onClick={handleOnProceed}
            >
              ページを離れる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
