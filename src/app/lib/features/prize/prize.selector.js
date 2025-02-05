import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectPrizes = createDraftSafeSelector(
  (state) => state.prizes,
  (prizes) => prizes.prizes
)
