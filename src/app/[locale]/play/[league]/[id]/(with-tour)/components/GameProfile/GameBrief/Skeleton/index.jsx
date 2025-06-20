import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const GameBriefSkeleton = () => {
  return (
    <>
      {/* 1 */}
      <Container className="border-border border-b">
        <Item>
          <Skeleton className="h-6 w-36" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="bg-accent/50 h-6 w-32" />
        </Item>
      </Container>
      {/* 2 */}
      <Container className="border-border border-b">
        <Item>
          <Skeleton className="h-6 w-28" />
          <Skeleton className="bg-accent/50 h-6 w-24" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="bg-accent/50 h-6 w-36" />
        </Item>
      </Container>
      {/* 3 */}
      <Container className="border-border border-b">
        <Item>
          <Skeleton className="h-6 w-12" />
          <Skeleton className="bg-accent/50 h-6 w-24" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
      </Container>
      {/* 4 */}
      <Container className="border-border border-b">
        <Item>
          <Skeleton className="h-6 w-44" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
      </Container>
      {/* 5 */}
      <Container className="border-border border-b">
        <Item>
          <Skeleton className="xs:w-28 h-6 w-20" />
          <Skeleton className="bg-accent/50 xs:w-48 h-6 w-40" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-28" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
      </Container>
      {/* 6 */}
      <Container>
        <Item>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="bg-accent/50 h-6 w-12" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-16" />
          <Skeleton className="bg-accent/50 h-6 w-12" />
        </Item>
      </Container>
    </>
  )
}

export const GameBriefContainerSkeleton = () => {
  return (
    <section className="fade-in-fast border-primary bg-background/60 hover:border-opacity-100 2xs:px-5 mx-auto flex h-min min-h-96 w-full max-w-lg flex-col gap-3 rounded-xl border px-4 py-5 transition-all lg:mx-0 lg:w-1/2 lg:max-w-[24rem] lg:gap-4 lg:px-6 xl:h-min xl:max-w-136">
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
