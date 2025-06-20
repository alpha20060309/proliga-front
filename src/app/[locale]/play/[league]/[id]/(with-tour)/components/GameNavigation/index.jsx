'use client'

import Gutter from 'shared/Gutter'
import { memo } from 'react'
import Box from '@mui/material/Box'
import { StyledTab, StyledTabs } from 'components/StyledTabs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOUR_STATUS, getTourName } from 'app/utils/tour.util'
import { setCurrentTourIndex } from 'app/lib/features/tour/tour.slice'
import { setCurrentTourTeam } from 'app/lib/features/tourTeam/tourTeam.slice'
import {
  selectCurrentTour,
  selectRegisteredTour,
  selectTours,
} from 'app/lib/features/tour/tour.selector'
import { emptyTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { useTranslation } from 'react-i18next'
import { tabsClasses } from '@mui/material'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import {
  selectCurrentTourTeam,
  selectTourTeams,
} from 'app/lib/features/tourTeam/tourTeam.selector'

const GameNavigation = () => {
  return (
    <Gutter>
      <Tabs />
    </Gutter>
  )
}

function Tabs() {
  const dispatch = useDispatch()
  const selectedTours = useSelector(selectTours)
  const { currentTourIndex } = useSelector((state) => state.tour)
  const currentTour = useSelector(selectCurrentTour)
  const registeredTour = useSelector(selectRegisteredTour)
  const tourTeams = useSelector(selectTourTeams)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const currentTeam = useSelector(selectCurrentTeam)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { t } = useTranslation()

  useEffect(() => {
    if (selectTours?.length > 0 && tourTeams?.length > 0) {
      if (currentTour?.id !== currentTourTeam?.tour_id) {
        dispatch(setCurrentTourTeam(currentTour))
      }
    }
  }, [dispatch, currentTourIndex, currentTourTeam, tourTeams, currentTour])

  const handleClick = (index) => {
    if (currentTourIndex !== index) {
      dispatch(emptyTeamPlayers())
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
            onClick={() => handleClick(index)}
            className="m-0 w-32 space-y-0 disabled:cursor-default sm:w-40"
            disabled={
              currentTeam?.is_team_created
                ? item.status === TOUR_STATUS.notStarted ||
                  item.order < registeredTour?.order
                : item.status !== TOUR_STATUS.notStartedTransfer
            }
            label={
              <div className="tour-tab-container">
                <p className="tour-tab-title">
                  {getCorrectName({ lang, uz: item?.name, ru: item?.name_ru })}
                </p>
                <p className="tour-tab-description">
                  {getTourName(item.status, t)}
                </p>
              </div>
            }
          />
        ))}
      </StyledTabs>
    </Box>
  )
}

export default memo(GameNavigation)
