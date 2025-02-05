import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectPackages = createDraftSafeSelector(
  (state) => state.packages,
  (packages) => packages.packages
)

export const selectCurrentPackage = createDraftSafeSelector(
  (state) => state.packages,
  (packages) => packages.currentPackage
)
