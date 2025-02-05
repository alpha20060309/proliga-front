import Gutter from 'components/Gutter'
import { Skeleton } from '@/components/ui/skeleton'

export default function SettingsSkeleton() {
  return (
    <Gutter>
      <div className="z-40 flex h-full min-h-[44rem] flex-col gap-2 lg:min-h-[38rem] lg:flex-row">
        <Skeleton className="h-14 w-full rounded-xl bg-neutral-900 lg:min-h-[38rem] lg:w-64" />
        <Skeleton className="w-full flex-1 rounded-xl bg-neutral-900 md:min-h-[44rem] lg:min-h-[38rem]" />
      </div>
    </Gutter>
  )
}

export function ProfileSkeleton() {
  return (
    <Skeleton className="flex h-full flex-col gap-2 bg-neutral-900 md:min-h-[44rem] lg:min-h-[38rem] lg:flex-row" />
  )
}

export function NavigationSkeleton() {
  return (
    <Skeleton className="h-14 w-full rounded-xl bg-neutral-900 lg:min-h-[38rem] lg:w-64" />
  )
}
