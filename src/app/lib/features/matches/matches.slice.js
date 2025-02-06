import { createSlice } from '@reduxjs/toolkit'
import { matchesExtraReducer } from './matches.extraReducer'

const initialState = {
  matches: [],
  isLoading: false,
  currentMatch: {},
  count: 0,
  isModalOpen: false,
  error: null,
}

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    setCurrentMatch: (state, action) => {
      state.currentMatch = action.payload
    },
    setMatchModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
  extraReducers: matchesExtraReducer,
})

export const { setCurrentMatch, setMatchModalOpen } = matchesSlice.actions

export default matchesSlice.reducer
