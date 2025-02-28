import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectUserTable = createDraftSafeSelector(
  (state) => state.auth,
  (auth) => auth.user
)

export const selectGeo = createDraftSafeSelector(
  (state) => state.auth,
  (auth) => auth.geo
)

export const selectAgent = createDraftSafeSelector(
  (state) => state.auth,
  (auth) => auth.agent
)
