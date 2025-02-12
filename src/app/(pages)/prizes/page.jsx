'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCompetition } from 'app/lib/features/competition/competition.thunk'
import dynamic from 'next/dynamic'
const PrizesSection = dynamic(() => import('./components/Prizes'), {
  ssr: false,
  loading: () => <PrizesSkeleton />,
})
import { PrizesSkeleton } from './components/PrizesSkeleton'
import { selectCompetition } from 'app/lib/features/competition/competition.selector'

const Prizes = () => {
  const dispatch = useDispatch()
  const competitions = useSelector(selectCompetition)

  useEffect(() => {
    if (competitions?.length === 0) {
      dispatch(fetchCompetition())
    }
  }, [dispatch, competitions?.length])

  return <PrizesSection />
}

export default Prizes
