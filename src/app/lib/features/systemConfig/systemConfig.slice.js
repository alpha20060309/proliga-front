import { createSlice } from '@reduxjs/toolkit'
import { systemConfigExtraReducer } from './systemConfig.extraReducer'

const initialState = {
  config: {},
  theme: {
    lightColors: {},
    darkColors: {},
    font: "",
    letterSpacing: 0,
    radius: 0,
    shadows: {}, spacing: 0,
  },
  lightTheme: {
    colors: {},
    font: "",
    global: {},
    shadows: {},
  },
  darkTheme: {
    colors: {},
    font: "",
    global: {},
    shadows: {},
  },
  isLoading: false,
  error: null,
}

const systemConfigSlice = createSlice({
  name: 'systemConfig',
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      const { type, data } = action.payload

      switch (type) {
        case 'colors':
          state.darkTheme.colors = data
          break
        case 'font':
          state.darkTheme.font = data
          break
        case 'global':
          state.darkTheme.global = data
          break
        case 'shadows':
          state.darkTheme.shadows = data
          break
      }

    },
    setLightTheme: (state, action) => {
      const { type, data } = action.payload

      switch (type) {
        case 'colors':
          state.lightTheme.colors = data
          break
        case 'font':
          state.lightTheme.font = data
          break
        case 'global':
          state.lightTheme.global = data
          break
        case 'shadows':
          state.lightTheme.shadows = data
          break
      }
    },
  },
  extraReducers: systemConfigExtraReducer,
})

export const { setDarkTheme, setLightTheme } = systemConfigSlice.actions

export default systemConfigSlice.reducer
