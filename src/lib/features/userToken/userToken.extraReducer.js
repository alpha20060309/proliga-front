import { fetchUserToken } from './userToken.thunk'

export const userTokenExtraReducer = (builder) => {
    builder
        .addCase(fetchUserToken.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchUserToken.fulfilled, (state, action) => {
            state.isLoading = false
            state.userToken = action.payload?.data || null
        })
        .addCase(fetchUserToken.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.error
        })
}
