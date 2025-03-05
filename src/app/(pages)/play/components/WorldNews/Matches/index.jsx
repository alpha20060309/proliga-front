'use client'

import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetchMatches } from 'app/lib/features/match/match.thunk'
import Match from './Match'
import MatchSkeleton from './Match/Skeleton'
import { Pagination } from 'components/Table/Pagination'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectMatches } from 'app/lib/features/match/match.selector'
import { selectTours } from 'app/lib/features/tour/tour.selector'
import { usePathname } from 'next/navigation'
import { RefreshCcw } from 'lucide-react'
import MatchEvent from 'components/Modals/MatchEvent'

const Matches = () => {
  const path = usePathname()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { isLoading: toursLoading, currentTourIndex } = useSelector(
    (state) => state.tour
  )
  const tours = useSelector(selectTours)
  const { isLoading: teamLoading } = useSelector((store) => store.currentTeam)
  const { season } = useSelector((store) => store.season)
  const { isLoading, count } = useSelector((state) => state.match)
  const matches = useSelector(selectMatches)
  const { lang } = useSelector((store) => store.systemLanguage)
  const [tourIndex, setTourIndex] = useState(0)
  const [currentTour, setCurrentTour] = useState(null)
  const [page, setPage] = useState(0)
  const perPage = 10
  const pages = useMemo(() => Math.ceil(count / perPage), [count, perPage])
  const competition_id = +path.split('/')[2] || 0

  const handleChangeTour = (value) => {
    const newIndex = tours.findIndex((tour) => tour.id === value)
    if (newIndex !== -1) {
      setTourIndex(newIndex)
      setCurrentTour(tours[newIndex])
    }
  }

  useEffect(() => {
    if (currentTourIndex > -1) {
      setCurrentTour(tours[currentTourIndex])
      setTourIndex(currentTourIndex)
    }
  }, [tours, currentTourIndex])

  const handleIncrementTourIndex = () => {
    if (tourIndex < tours.length - 1) {
      setTourIndex(tourIndex + 1)
      setCurrentTour(tours[tourIndex + 1])
    }
  }

  const handleDecrementTourIndex = () => {
    if (tourIndex > 0) {
      setTourIndex(tourIndex - 1)
      setCurrentTour(tours[tourIndex - 1])
    }
  }

  useEffect(() => {
    if (
      season?.id &&
      competition_id &&
      currentTour?.id &&
      !toursLoading &&
      !teamLoading
    ) {
      dispatch(
        fetchMatches({
          season_id: season?.id,
          competition_id,
          tour_id: currentTour?.id,
          page,
          perPage,
        })
      )
    }
  }, [
    season,
    dispatch,
    competition_id,
    currentTour,
    toursLoading,
    page,
    perPage,
    teamLoading,
  ])

  const refreshData = () => {
    dispatch(
      fetchMatches({
        season_id: season?.id,
        competition_id,
        tour_id: currentTour?.id,
        page,
        perPage,
      })
    )
  }

  return (
    <section className="relative mx-auto flex h-min min-h-[42rem] w-full max-w-lg flex-1 flex-col justify-between space-y-4 rounded-xl border border-neutral-600 bg-black px-4 py-6 lg:mx-0 lg:w-auto lg:min-w-72 xl:flex-grow 2xl:max-w-lg">
      <div className="flex w-full items-center justify-center">
        <div className="mx-auto ml-9 flex flex-1 items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-9 border-neutral-400"
            onClick={handleDecrementTourIndex}
            disabled={tourIndex === 0}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Select value={currentTour?.id} onValueChange={handleChangeTour}>
            <SelectTrigger
              showIcon={false}
              className="h-9 w-20 rounded-sm border-2 border-x-0 border-t-0 border-neutral-400 text-center text-base outline-none ring-0 ring-offset-0 hover:outline-none"
            >
              <SelectValue placeholder={t('Tur')} />
            </SelectTrigger>
            <SelectContent>
              {tours.map((tour) => (
                <SelectItem key={tour.id} value={tour.id}>
                  {getCorrectName({
                    lang,
                    uz: tour?.name,
                    ru: tour?.name_ru,
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="size-9 border-neutral-400"
            onClick={handleIncrementTourIndex}
            disabled={tourIndex === tours.length - 1}
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
        <Button
          onClick={refreshData}
          variant="outline"
          size="icon"
          className="size-9 border-neutral-400"
        >
          <RefreshCcw className="size-5" />
        </Button>
      </div>
      <div className="flex-1 space-y-1">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MatchSkeleton key={index} />
          ))
        ) : (
          <>
            {matches?.length === 0 ? (
              <p className="text-muted-foreground text-center">
                {t('Matchlar topilmadi!')}
              </p>
            ) : (
              matches?.map((match, index) => (
                <Match key={index} match={match} />
              ))
            )}
          </>
        )}
      </div>
      <Pagination
        onPageChange={setPage}
        currentPage={page}
        totalPages={pages}
      />
      <MatchEvent />
    </section>
  )
}

export default Matches
