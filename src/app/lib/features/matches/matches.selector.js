import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectMatches = createDraftSafeSelector(
  (state) => state.matches,
  (matches) => matches.matches
)
