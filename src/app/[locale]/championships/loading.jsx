import { Skeleton } from '@/components/ui/skeleton'
import { ChampionshipSkeleton } from './components/Skeleton'

export default function ChampionshipsLoading() {
  return (
    <section className="bg-card border-border mt-8 mb-4 min-h-120 w-full rounded-lg border p-4 backdrop-blur-sm sm:p-5 md:mt-6 md:min-h-48">
      <Skeleton className="mb-6 h-7 w-48" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <ChampionshipSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
