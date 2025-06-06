import { Button } from '@/features/common/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/features/common/components/ui/dialog'
import { useBlender } from '@/features/blend/hooks/use-blender'
import { useNavigate } from '@tanstack/react-router'
import { $selectedInks } from '@/features/blend/stores/SelectedInks'
import { useStore } from '@nanostores/react'

export default function ConfirmBlendDialog() {
  const { canBlend } = useBlender()
  const navigate = useNavigate()
  const selectedInks = useStore($selectedInks)

  const handleBlendStart = () => {
    if (canBlend) {
      navigate({ to: '/blend/result', replace: true })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="w-full h-auto py-1.5 rounded text-xl font-bold text-center text-white bg-theme-orage-primary hover:bg-theme-orage-primary/75 cursor-pointer disabled:bg-theme-gray-secondary disabled:text-theme-gray-primary"
          disabled={!canBlend}
        >
          ブレンドする
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ブレンドを開始しますか？</DialogTitle>
          <DialogDescription>
            以下の内容でブレンドを行います。
          </DialogDescription>
        </DialogHeader>
        <div>
          <ul className="flex justify-evenly gap-4">
            {selectedInks.map(({ amount, color }) => (
              <li key={color.name} className="flex flex-col items-center gap-3">
                <div>
                  <img
                    src={color.thumbnails.bottle}
                    alt={color.name}
                    width="180"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="size-8 rounded-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-sm">{amount}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-theme-gray-primary text-theme-gray-tertiary hover:bg-theme-gray-primary hover:text-theme-gray-tertiary cursor-pointer rounded hover:opacity-50"
              size="sm"
            >
              インク選択へ戻る
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-theme-orage-primary hover:bg-theme-orage-primary/75 text-white cursor-pointer rounded"
            size="sm"
            onClick={handleBlendStart}
          >
            ブレンドを開始する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
