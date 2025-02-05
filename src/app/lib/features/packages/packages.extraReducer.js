import { fetchPackages } from './packages.thunk'

export const packagesExtraReducer = (builder) => {
  builder
    .addCase(fetchPackages.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchPackages.fulfilled, (state, action) => {
      state.packages = []
      if (action.payload.data?.length > 0) {
        state.packages = action.payload.data
        state.packages.sort((a, b) => a?.id - b?.id)
      }
      state.isLoading = false
    })
    .addCase(fetchPackages.rejected, (state, action) => {
      state.error = action.payload?.error?.message ?? null
      state.isLoading = false
    })
}
