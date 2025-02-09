import { fetchPrizes } from './prize.thunk'

export const prizesExtraReducer = (builder) => {
  builder
    .addCase(fetchPrizes.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchPrizes.fulfilled, (state, action) => {
      state.prizes = []
      if (action.payload.data?.length > 0) {
        state.prizes = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchPrizes.rejected, (state, action) => {
      state.error = action?.error?.message ?? null
      state.isLoading = false
    })
}
