import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectMatches = createDraftSafeSelector(
  (state) => state.matches,
  (matches) => matches.matches
)

export const selectCurrentMatch = createDraftSafeSelector(
  (state) => state.matches,
  (matches) => matches.currentMatch
)
