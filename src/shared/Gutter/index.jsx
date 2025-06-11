import { cn } from '@/lib/utils'

export default function Gutter({ children, className }) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-6 2xl:px-0',
        className
      )}
    >
      {children}
    </div>
  )
}
