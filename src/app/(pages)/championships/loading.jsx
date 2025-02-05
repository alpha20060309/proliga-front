import { Skeleton } from '@/components/ui/skeleton'
import { ChampionshipSkeleton } from './components/Skeleton'

export default function ChampionshipsLoading() {
  return (
    <section className="mb-4 mt-8 min-h-[30rem] w-full rounded-lg border border-neutral-700 bg-neutral-800 p-4 backdrop-blur sm:p-5 md:mt-6 md:min-h-48">
      <Skeleton className="mb-6 h-7 w-48" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <ChampionshipSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
