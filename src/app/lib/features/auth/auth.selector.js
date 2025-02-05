import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectUserAuth = createDraftSafeSelector(
  (state) => state.auth,
  (auth) => auth.userAuth
)

export const selectUserTable = createDraftSafeSelector(
  (state) => state.auth,
  (auth) => auth.userTable
)

export const selectGeo = createDraftSafeSelector(
  (state) => state.auth,
  (auth) => auth.geo
)

export const selectAgent = createDraftSafeSelector(
  (state) => state.auth,
  (auth) => auth.agent
)
