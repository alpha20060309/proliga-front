import { createSlice } from '@reduxjs/toolkit'
import { playersExtraReducer } from './players.extraReducer'

const initialState = {
  topPlayers: [],
  topPlayersLoading: false,
  topPlayersError: null,
  currentPlayer: {},
  isModalOpen: false,
  players: [],
  isLoading: false,
  error: null,
  count: 0,
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setCurrentPlayer: (state, action) => {
      state.currentPlayer =
        state.players.find((p) => p.id === action.payload) ?? {}
    },
    setPlayerModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
  extraReducers: playersExtraReducer,
})

export const { setCurrentPlayer, setPlayerModalOpen } = playersSlice.actions

export default playersSlice.reducer
