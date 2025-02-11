import { createSlice } from '@reduxjs/toolkit'
import { prizesExtraReducer } from './prize.extraReducer'

const initialState = {
  prizes: [],
  isLoading: false,
  error: null,
  count: 0,
}

const prizesSlice = createSlice({
  name: 'prize',
  initialState,
  reducers: {},
  extraReducers: prizesExtraReducer,
})

export default prizesSlice.reducer
