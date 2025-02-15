import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectPrizes = createDraftSafeSelector(
  (state) => state.prize,
  (prizes) => prizes.prizes
)
