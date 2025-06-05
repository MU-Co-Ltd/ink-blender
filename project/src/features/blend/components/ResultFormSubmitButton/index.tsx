import { Button } from '@/features/common/components/ui/button'
import { useFormState } from 'react-hook-form'

export default function ResultFormSubmitButton() {
  const { isDirty } = useFormState()

  return (
    <Button
      type="submit"
      className="w-full h-auto py-2.5 rounded text-xl font-bold text-center text-white bg-theme-orage-primary hover:bg-theme-orage-primary/75 cursor-pointer disabled:bg-theme-gray-secondary disabled:text-theme-gray-primary disabled:opacity-100"
      disabled={!isDirty}
    >
      標本を作成する
    </Button>
  )
}
