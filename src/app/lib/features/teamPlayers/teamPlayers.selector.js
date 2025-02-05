import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectTeamConcat = createDraftSafeSelector(
  (state) => state.teamPlayers,
  (teamPlayers) =>
    teamPlayers.GOA.concat(teamPlayers.DEF, teamPlayers.MID, teamPlayers.STR)
)

export const selectTotalPlayersCount = createDraftSafeSelector(
  (state) => state.teamPlayers,
  (teamPlayers) =>
    teamPlayers.playersCount?.GOA +
    teamPlayers.playersCount?.DEF +
    teamPlayers.playersCount?.MID +
    teamPlayers.playersCount?.STR
)
