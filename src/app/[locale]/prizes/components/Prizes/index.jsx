'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { CompetitionSkeleton, PrizesSkeleton } from '../PrizesSkeleton'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { selectCompetition } from 'app/lib/features/competition/competition.selector'
import { selectPrizes } from 'app/lib/features/prize/prize.selector'
const PrizesTitle = dynamic(() => import('../PrizesTitle'), {
  ssr: false,
  loading: () => <Skeleton className="bg-muted mb-4 h-12 w-48" />,
})
const PrizeCompetition = dynamic(() => import('../Competition'), {
  ssr: false,
  loading: () => <CompetitionSkeleton />,
})

const PrizesSection = () => {
  const { t } = useTranslation()
  const competition = useSelector(selectCompetition)
  const prizes = useSelector(selectPrizes)
  const { isLoading: competitionLoading } = useSelector(
    (store) => store.competition
  )
  const { isLoading: prizesLoading } = useSelector((store) => store.prize)

  const isLoading = useMemo(
    () => competitionLoading || prizesLoading,
    [competitionLoading, prizesLoading]
  )

  return (
    <>
      {isLoading ? (
        <PrizesSkeleton />
      ) : prizes?.length > 0 ? (
        <>
          <PrizesTitle />
          <section className="flex flex-col items-center justify-center gap-2">
            {competition?.map((competition, index) => (
              <PrizeCompetition competition={competition} key={index} />
            ))}
          </section>
        </>
      ) : (
        <h1 className="text-foreground text-center text-2xl">
          {t('Hozircha yutuqlar yoq')}
        </h1>
      )}
    </>
  )
}

export default PrizesSection
