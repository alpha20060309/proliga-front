import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectTeams = createDraftSafeSelector(
  (state) => state.teams,
  (teams) => teams.teams
)

export const selectTopTeams = createDraftSafeSelector(
  (state) => state.teams,
  (teams) => teams.topTeams
)

export const selectAllTeams = createDraftSafeSelector(
  (state) => state.teams,
  (teams) => teams.allTeams
)
