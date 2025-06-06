import { useBlender } from '@/features/blend/hooks/use-blender'
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
import { createFileRoute, Outlet, useBlocker } from '@tanstack/react-router'

export const Route = createFileRoute('/blend/result')({
  component: RouteComponent,
})

function RouteComponent() {
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

  return (
    <>
      <main className="pt-16">
        <div className="container px-10 mx-auto">
          <Outlet />
        </div>
      </main>
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
