'use client'

import Box from '@mui/material/Box'
import { StyledTab, StyledTabs } from 'components/StyledTabs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { setCurrentTourIndex } from 'app/lib/features/tour/tour.slice'
import { setCurrentTourTeam } from 'app/lib/features/tourTeam/tourTeam.slice'
import {
  selectCurrentTour,
  selectRegisteredTour,
  selectTours,
} from 'app/lib/features/tour/tour.selector'
import { emptyTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { tabsClasses } from '@mui/material'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import {
  selectCurrentTourTeam,
  selectTourTeams,
} from 'app/lib/features/tourTeam/tourTeam.selector'
import GameTab from 'shared/GameTab'
import { useTransitionRouter } from 'next-view-transitions'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'

export default function TourTabs() {
  const dispatch = useDispatch()
  const router = useTransitionRouter()
  const selectedTours = useSelector(selectTours)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const { currentTourIndex } = useSelector((state) => state.tour)
  const currentTour = useSelector(selectCurrentTour)
  const registeredTour = useSelector(selectRegisteredTour)
  const tourTeams = useSelector(selectTourTeams)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const currentTeam = useSelector(selectCurrentTeam)

  useEffect(() => {
    if (selectTours?.length > 0 && tourTeams?.length > 0) {
      if (currentTour?.id !== currentTourTeam?.tour_id) {
        dispatch(setCurrentTourTeam(currentTour))
      }
    }
  }, [dispatch, currentTourIndex, currentTourTeam, tourTeams, currentTour])

  const handleClick = (index, item) => {
    if (currentTourIndex !== index) {
      dispatch(emptyTeamPlayers())
    }
    console.log(item)
    if (item.status === TOUR_STATUS.notStarted) {
      router.push(`/play/${currentCompetition?.id}/${currentTeam?.id}`)
    }
    dispatch(setCurrentTourTeam(index))
    dispatch(setCurrentTourIndex(index))
  }

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'var(--card)',
        color: 'var(--card-foreground)',
        height: 'auto',
        borderRadius: 'var(--radius)',
        minHeight: '64px',
      }}
      width={'100%'}
    >
      <StyledTabs
        value={currentTourIndex}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        className="fade-in animate-in text-foreground disabled:text-muted-foreground m-0 snap-x snap-center rounded duration-500"
        aria-label="tour tabs"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.4 },
          },
        }}
      >
        {selectedTours?.map((item, index) => (
          <StyledTab
            key={item.id}
            onClick={() => handleClick(index, item)}
            className="m-0 w-32 space-y-0 disabled:cursor-default sm:w-40"
            disabled={
              currentTeam?.is_team_created
                ? item.status === TOUR_STATUS.notStarted ||
                  item.order < registeredTour?.order
                : item.status !== TOUR_STATUS.notStartedTransfer
            }
            label={<GameTab item={item} />}
          />
        ))}
      </StyledTabs>
    </Box>
  )
}
