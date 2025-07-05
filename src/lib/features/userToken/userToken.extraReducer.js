import { fetchUserToken } from './userToken.thunk'

export const userTokenExtraReducer = (builder) => {
    builder
        .addCase(fetchUserToken.pending, (state) => {
            state.tokenLoading = true
        })
        .addCase(fetchUserToken.fulfilled, (state, action) => {
            state.tokenLoading = false
            state.userToken = action.payload?.data || null
            state.tokenLoaded = true
        })
        .addCase(fetchUserToken.rejected, (state, action) => {
            state.tokenLoading = false
            state.tokenError = action?.error
            state.tokenLoaded = true
        })
}
