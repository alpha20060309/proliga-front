import { createSlice } from '@reduxjs/toolkit'
import { teamsExtraReducer } from './teams.extraReducer'

const initialState = {
  allTeams: [],
  teamsLoading: false,
  teamsError: null,
  teamsCount: 0,
  topTeams: [],
  topTeamsLoading: false,
  topTeamsError: null,
  teams: [],
  isLoading: false,
  error: null,
}

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload
    },
    setAllTeams: (state, action) => {
      state.allTeams = action.payload
    },
    setCount: (state, action) => {
      state.teamsCount = action.payload
    },
    addGameToTeam: (state, action) => {
      if (action.payload) {
        state.teams.push(action.payload)
      }
    },
    resetTeams: () => initialState,
    resetSearchResults: (state) => {
      state.searchResults = []
      state.searchCount = 0
      state.searchError = null
    },
  },
  extraReducers: teamsExtraReducer,
})

export const { setTeams, addGameToTeam, resetTeams, resetSearchResults } =
  teamsSlice.actions

export default teamsSlice.reducer
