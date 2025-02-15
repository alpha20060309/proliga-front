'use client'

import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { resetSearchResults } from 'app/lib/features/team/team.slice'
import { searchAllTeams } from 'app/lib/features/team/team.thunk'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { debounce } from 'lodash'

const TeamSearch = ({
  page,
  perPage,
  tour_id,
  setPage,
  setIsSearchMode,
  setSearchTerm,
}) => {
  // eslint-disable-next-line no-undef
  const timing = +process.env.NEXT_PUBLIC_DEBOUNCE_TIMING || 1000
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const { season } = useSelector((state) => state.season)
  const { teamsLoading } = useSelector((state) => state.team)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const debouncedSearchRef = useRef(null)

  const performSearch = useCallback(
    (term) => {
      if (season?.id && currentCompetition?.id && page >= 0) {
        setIsSearchMode(!!term)
        setSearchTerm(term)
        if (term) {
          dispatch(
            searchAllTeams({
              season_id: season.id,
              competition_id: currentCompetition?.id,
              page,
              perPage,
              tour_id,
              searchTerm: term,
            })
          )
        } else {
          dispatch(resetSearchResults())
        }
      }
    },
    [
      dispatch,
      season,
      currentCompetition,
      page,
      perPage,
      tour_id,
      setIsSearchMode,
      setSearchTerm,
    ]
  )

  useEffect(() => {
    const debouncedSearch = debounce(performSearch, timing)
    debouncedSearchRef.current = debouncedSearch

    return () => {
      if (debouncedSearchRef.current) {
        debouncedSearchRef.current.cancel()
      }
    }
  }, [performSearch, timing])

  useEffect(() => {
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(localSearchTerm)
    }
  }, [localSearchTerm])

  const handleSearchChange = useCallback(
    (e) => {
      setLocalSearchTerm(e.target.value)
      setPage(0)
    },
    [setPage]
  )

  useEffect(() => {
    return () => {
      dispatch(resetSearchResults())
    }
  }, [dispatch])

  return (
    <div className="relative w-2/3 max-w-80">
      <Input
        aria-label="team search"
        id="team-search"
        placeholder={t('Enter team name...')}
        value={localSearchTerm}
        onChange={handleSearchChange}
        className="h-8 w-full rounded border-neutral-500 bg-black pl-2 pr-7 text-sm"
        disabled={teamsLoading}
      />
      <Search className="absolute right-2 top-1/2 hidden size-5 -translate-y-1/2 text-neutral-400 xs:block" />
    </div>
  )
}

export default TeamSearch
