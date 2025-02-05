import { createSlice } from '@reduxjs/toolkit'
import { userActivityExtraReducer } from './userActivity.extraReducer'

const initialState = {
  activities: [],
  isLoading: false,
  count: 0,
  error: null,
}

const userActivity = createSlice({
  name: 'teams',
  initialState,
  extraReducers: userActivityExtraReducer,
})

export default userActivity.reducer
