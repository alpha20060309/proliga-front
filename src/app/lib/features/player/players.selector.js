import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectPlayers = createDraftSafeSelector(
  (store) => store.players,
  (players) => players.players
)

export const selectTopPlayers = createDraftSafeSelector(
  (store) => store.players,
  (players) => players.topPlayers
)

export const selectCurrentPlayer = createDraftSafeSelector(
  (store) => store.players,
  (players) => players.currentPlayer
)
