import { Skeleton } from '@/components/ui/skeleton'

const AuthSkeleton = () => {
  return (
    <section className="mx-4 mb-8 mt-24 flex w-full max-w-[28rem] flex-col gap-4 bg-black sm:mx-0 2xl:mt-32">
      <AuthTabsSkeleton />
      <LoginFormSkeleton />
    </section>
  )
}

export const LoginFormSkeleton = () => {
  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-8">
      <div className="flex w-full flex-col gap-1">
        <Skeleton className="mb-4 h-8 w-3/4" />
        <div className="relative flex flex-col gap-1">
          <Skeleton className="mb-1 h-4 w-1/3" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
        <div className="relative flex flex-col gap-1">
          <Skeleton className="mb-1 h-4 w-1/3" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
        <div className="my-3 flex justify-between">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-12 w-full rounded" />
      </div>
      <div className="mt-4 space-y-4">
        <Skeleton className="mx-auto h-5 w-1/2" />
        <div className="flex justify-between space-x-2">
          <Skeleton className="h-10 w-1/2 rounded" />
          <Skeleton className="h-10 w-1/2 rounded" />
        </div>
      </div>
    </section>
  )
}

export const SignUpFormSkeleton = () => {
  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-8">
      <div className="flex w-full flex-col gap-1">
        <Skeleton className="mb-4 h-8 w-3/4" />
        <div className="relative flex flex-col gap-1">
          <Skeleton className="mb-1 h-4 w-1/3" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
        <div className="relative flex flex-col gap-1">
          <Skeleton className="mb-1 h-4 w-1/3" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
        <div className="relative flex flex-col gap-1">
          <Skeleton className="mb-1 h-4 w-1/3" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
        <div className="relative flex flex-col gap-1">
          <Skeleton className="mb-1 h-4 w-1/3" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
        <div className="my-3 flex items-center">
          <Skeleton className="mr-1.5 h-4 w-4 rounded" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-12 w-full rounded" />
      </div>
      <div className="mt-4 space-y-4">
        <Skeleton className="mx-auto h-5 w-1/2" />
        <div className="flex justify-between space-x-2">
          <Skeleton className="h-10 w-1/2 rounded" />
          <Skeleton className="h-10 w-1/2 rounded" />
        </div>
      </div>
    </section>
  )
}
export const AuthTabsSkeleton = () => {
  return (
    <div className="flex space-x-1 rounded bg-neutral-900 p-1">
      <Skeleton className="h-8 flex-1 rounded bg-black" />
      <Skeleton className="h-8 flex-1 rounded bg-neutral-800" />
    </div>
  )
}

export default AuthSkeleton
