import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectTours = createDraftSafeSelector(
  (state) => state.tours,
  (tours) => tours.tours
)

export const selectCurrentTour = createDraftSafeSelector(
  (state) => state.tours,
  (tours) => tours.currentTour
)

export const selectRegisteredTour = createDraftSafeSelector(
  (state) => state.tours,
  (tours) => tours.registeredTour
)
