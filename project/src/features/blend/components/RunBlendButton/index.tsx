import { Button } from '@/features/common/components/ui/button'
import { useBlender } from '@/features/blend/hooks/use-blender'

export default function RunBlendButton() {
  const { canBlend } = useBlender()

  return (
    <Button
      type="button"
      className="w-full py-2.5 rounded-md text-xl font-bold text-center text-white bg-theme-orage-primary hover:bg-theme-orage-primary/75 cursor-pointer disabled:bg-theme-gray-secondary disabled:text-theme-gray-primary"
      disabled={!canBlend}
    >
      ブレンドする
    </Button>
  )
}
