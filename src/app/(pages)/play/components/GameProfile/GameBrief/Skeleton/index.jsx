import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const GameBriefSkeleton = () => {
  return (
    <>
      {/* 1 */}
      <Container className="border-b border-neutral-700">
        <Item>
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-16 bg-primary/50" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32 bg-primary/50" />
        </Item>
      </Container>
      {/* 2 */}
      <Container className="border-b border-neutral-700">
        <Item>
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-24 bg-primary/50" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-36 bg-primary/50" />
        </Item>
      </Container>
      {/* 3 */}
      <Container className="border-b border-neutral-700">
        <Item>
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-24 bg-primary/50" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-16 bg-primary/50" />
        </Item>
      </Container>
      {/* 4 */}
      <Container className="border-b border-neutral-700">
        <Item>
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-6 w-16 bg-primary/50" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-16 bg-primary/50" />
        </Item>
      </Container>
      {/* 5 */}
      <Container className="border-b border-neutral-700">
        <Item>
          <Skeleton className="h-6 w-20 xs:w-28" />
          <Skeleton className="h-6 w-40 bg-primary/50 xs:w-48" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-16 bg-primary/50" />
        </Item>
      </Container>
      {/* 6 */}
      <Container>
        <Item>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-12 bg-primary/50" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-12 bg-primary/50" />
        </Item>
      </Container>
    </>
  )
}

export const GameBriefContainerSkeleton = () => {
  return (
    <section className="fade-in-fast mx-auto flex h-min min-h-96 w-full max-w-[32rem] flex-col gap-3 rounded-xl border border-primary border-opacity-50 bg-neutral-950 px-4 py-5 transition-all hover:border-opacity-100 2xs:px-5 lg:mx-0 lg:w-1/2 lg:max-w-[24rem] lg:gap-4 lg:px-6 xl:h-min xl:max-w-[34rem]">
      <GameBriefSkeleton />
    </section>
  )
}

const Container = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col gap-2 pb-2', className)}>{children}</div>
  )
}
const Item = ({ children, className }) => {
  return (
    <div className={cn('flex items-center justify-between gap-1', className)}>
      {children}
    </div>
  )
}

export default GameBriefSkeleton
