import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectTourTeams = createDraftSafeSelector(
  (state) => state.tourTeams,
  (tourTeams) => tourTeams.tourTeams
)

export const selectCurrentTourTeam = createDraftSafeSelector(
  (state) => state.tourTeams,
  (tourTeams) => tourTeams.currentTourTeam
)
