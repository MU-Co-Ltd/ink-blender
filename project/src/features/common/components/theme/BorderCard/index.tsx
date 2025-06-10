import { cn } from '@/libs/utils'
import type { PropsWithChildren } from 'react'

interface ComponentProps {
  className?: string
}

export default function BorderCard({
  children,
  className,
}: PropsWithChildren<ComponentProps>) {
  return (
    <div className={cn('border border-theme-gray-primary', className)}>
      {children}
    </div>
  )
}
