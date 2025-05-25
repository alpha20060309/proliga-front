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
import {
  selectCurrentTourTeam,
  selectTourTeams,
} from 'app/lib/features/tourTeam/tourTeam.selector'

export default function TourTabs() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)
  const { currentTourIndex } = useSelector((store) => store.tour)
  const registeredTour = useSelector(selectRegisteredTour)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const currentTour = useSelector(selectCurrentTour)
  const tourTeams = useSelector(selectTourTeams)
  const tours = useSelector(selectTours)

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
    dispatch(setCurrentTourTeam(item))
    dispatch(setCurrentTourIndex(index))
  }

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'var(--background)',
        color: 'var(--foreground)',
        borderRadius: 'var(--radius)',
        minHeight: '64px',
      }}
      width={'100%'}
    >
      <StyledTabs
        value={currentTourIndex}
        variant="scrollable"
        scrollButtons="auto"
        className="text-foreground disabled:text-muted-foreground roundeds snap-x snap-center"
        aria-label="tour tabs"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.4 },
          },
        }}
      >
        {tours?.map((item, index) => (
          <StyledTab
            key={item.id}
            onClick={() => handleClick(index, item)}
            className="hover:bg-primary hover:bg-opacity-10 w-32 snap-center space-y-0 rounded-sm disabled:cursor-default sm:w-48"
            disabled={
              item.status === TOUR_STATUS.notStarted ||
              item.status === TOUR_STATUS.notStartedTransfer ||
              item.order < registeredTour?.order
            }
            label={
              <div className="flex h-12 flex-col items-center justify-start gap-1 sm:h-16">
                <h3 className="text-foreground text-start text-xs font-medium md:text-sm xl:text-base">
                  {getCorrectName({ lang, uz: item?.name, ru: item?.name_ru })}
                </h3>
                <p className="text-muted-foreground text-3xs max-w-28 capitalize sm:text-xs">
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
