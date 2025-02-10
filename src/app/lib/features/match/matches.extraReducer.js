import { fetchMatches } from './mathes.thunk'

export const matchesExtraReducer = (builder) => {
  builder
    .addCase(fetchMatches.pending, (state) => {
      state.isLoading = true
      state.matches = []
    })
    .addCase(fetchMatches.fulfilled, (state, action) => {
      state.count = action.payload.count || 0
      if (action.payload.data) {
        state.matches = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchMatches.rejected, (state, action) => {
      state.error = action?.error?.message ?? null
      state.isLoading = false
    })
}
