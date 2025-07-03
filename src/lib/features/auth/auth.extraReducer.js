import { fetchGeo, fetchFirebaseToken } from './auth.thunk'

export const authExtraReducer = (builder) => {
  builder
    .addCase(fetchGeo.pending, (state) => {
      state.geoLoading = true
    })
    .addCase(fetchGeo.fulfilled, (state, action) => {
      state.geoLoading = false
      state.geo = action.payload?.data || null
    })
    .addCase(fetchGeo.rejected, (state, action) => {
      state.geoLoading = false
      state.geoError = action.payload?.error ?? null
    })
    .addCase(fetchFirebaseToken.pending, (state) => {
      state.tokenLoading = true
    })
    .addCase(fetchFirebaseToken.fulfilled, (state, action) => {
      state.tokenLoading = false
      state.token = action.payload?.data || null
    })
    .addCase(fetchFirebaseToken.rejected, (state, action) => {
      state.tokenLoading = false
      state.tokenError = action?.error 
    })
}
