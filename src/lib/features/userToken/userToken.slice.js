import { createSlice } from '@reduxjs/toolkit'
import { userTokenExtraReducer } from './userToken.extraReducer'

const initialState = {
    userToken: null,
    tokenError: null,
    isLoading: false,
    tokenLoaded: false,
}

const userTokenSlice = createSlice({
    name: 'userToken',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.userToken = action.payload
        },
    },
    extraReducers: userTokenExtraReducer,
})

export const {
    setUserToken,
} = userTokenSlice.actions

export default userTokenSlice.reducer
