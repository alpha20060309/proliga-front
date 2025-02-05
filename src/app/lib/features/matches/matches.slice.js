import { createSlice } from '@reduxjs/toolkit'
import { matchesExtraReducer } from './matches.extraReducer'

const initialState = {
  matches: [],
  isLoading: false,
  count: 0,
  error: null,
}

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: matchesExtraReducer,
})

export default matchesSlice.reducer
